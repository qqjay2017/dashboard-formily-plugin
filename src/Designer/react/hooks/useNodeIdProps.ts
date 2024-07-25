import type { TreeNode } from 'designablecore'
import { useDesigner } from './useDesigner'
import { useTreeNode } from './useTreeNode'

export function useNodeIdProps(node?: TreeNode) {
  const target = useTreeNode()
  const designer = useDesigner()
  return {
    [designer.props.nodeIdAttrName]: node ? node.id : target.id,
  }
}
