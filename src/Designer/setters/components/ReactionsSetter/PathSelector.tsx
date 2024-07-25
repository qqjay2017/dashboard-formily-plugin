import React from 'react'
import type { TreeNode } from 'designablecore'
import type { TreeSelectProps } from 'antd'
import { TreeSelect } from 'antd'
import { useSelectedNode } from '@/Designer/react/lib'

export interface IPathSelectorProps
  extends Omit<TreeSelectProps<any>, 'onChange'> {
  value?: string
  onChange?: (value: string, node: TreeNode) => void
  style?: React.CSSProperties
  className?: string
}

function transformDataSource(node: TreeNode) {
  const currentNode = node
  const dots = (count: number) => {
    let dots = ''
    for (let i = 0; i < count; i++) {
      dots += '.'
    }
    return dots
  }
  function targetPath(parentNode: TreeNode, targetNode: TreeNode) {
    const path = []
    const transform = (node: TreeNode) => {
      if (node && node !== parentNode) {
        path.push(node.props.name || node.id)
      }
      else {
        transform(node.parent)
      }
    }
    transform(targetNode)
    return path.reverse().join('.')
  }
  function hasNoVoidChildren(node: TreeNode) {
    return node.children?.some((node) => {
      if (node.props.type !== 'void' && node !== currentNode)
        return true
      return hasNoVoidChildren(node)
    })
  }
  function findRoot(node: TreeNode): TreeNode {
    if (!node?.parent)
      return node
    if (node?.parent?.componentName !== node.componentName)
      return node.parent
    return findRoot(node.parent)
  }
  const root = findRoot(node)
  if (root) {
    return transformChildren(root.children)
  }
  function findArrayParent(node: TreeNode) {
    if (!node?.parent)
      return
    if (node.parent.props.type === 'array')
      return node.parent
    if (node.parent === root)
      return
    return findArrayParent(node.parent)
  }
  function transformRelativePath(arrayNode: TreeNode, targetNode: TreeNode) {
    if (targetNode.depth === currentNode.depth)
      return `.${targetNode.props.name || targetNode.id}`
    return `${dots(currentNode.depth - arrayNode.depth)}[].${targetPath(
      arrayNode,
      targetNode,
    )}`
  }
  function transformChildren(children: TreeNode[], path = []) {
    return children.reduce((buf, node) => {
      if (node === currentNode)
        return buf
      if (node.props.type === 'array' && !node.contains(currentNode))
        return buf
      if (node.props.type === 'void' && !hasNoVoidChildren(node))
        return buf
      const currentPath = path.concat(node.props.name || node.id)
      const arrayNode = findArrayParent(node)
      const label
        = node.props.title
        || node.props['x-component-props']?.title
        || node.props.name
        || node.designerProps.title
      const value = arrayNode
        ? transformRelativePath(arrayNode, node)
        : currentPath.join('.')
      return buf.concat({
        label,
        value,
        node,
        children: transformChildren(node.children, currentPath),
      })
    }, [])
  }

  return []
}

export const PathSelector: React.FC<IPathSelectorProps> = (props) => {
  const baseNode = useSelectedNode()
  const dataSource = transformDataSource(baseNode)
  const findNode = (dataSource: any[], value: string) => {
    for (let i = 0; i < dataSource.length; i++) {
      const item = dataSource[i]
      if (item.value === value)
        return item.node
      if (item.children?.length) {
        const fondedChild = findNode(item.children, value)
        if (fondedChild)
          return fondedChild
      }
    }
  }
  return (
    <TreeSelect
      {...props}
      onChange={(value) => {
        props.onChange(value, findNode(dataSource, value))
      }}
      treeDefaultExpandAll
      treeData={dataSource}
    />
  )
}
