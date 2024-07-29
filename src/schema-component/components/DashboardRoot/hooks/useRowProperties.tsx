import type { Schema } from '@formily/react'
import { useFieldSchema } from '@formily/react'
import { useMemo } from 'react'
import type { BreakpointKey } from '../../PositionDecorator/types'
import { sizeFormat } from '@/utils'

const offsetSize = 0.1

export function useRowProperties(props?: {
  isPc?: boolean
  rowHeight?: number
  colWidth?: number
  breakpoint?: BreakpointKey
  width?: number
}) {
  const fieldSchema = useFieldSchema()

  return useMemo<Schema[]>(() => {
    if (props && !props.width) {
      return []
    }
    if (!props || props.isPc) {
      return fieldSchema.reduceProperties((buf, s) => {
        if (!s['x-hidden']) {
          buf.push(s)
        }
        return buf
      }, [])
    }
    if (props.breakpoint === 'mobile' || props.breakpoint === 'tablet') {
      // 分类下,头部
      const headerArr: Schema[] = []
      // 查询
      const queryArr: Schema[] = []
      // 边框
      let frameArr: Schema[] = []
      // 除了边框的,剩下的
      const blockArr: Schema[] = []
      const otherArr: Schema[] = []

      const blockFrameIndexMap = {}
      // 移动端 , // 优先用边框分组
      fieldSchema.reduceProperties((_, field) => {
        const component: string = (field['x-component'] || '').toLowerCase()

        if (component.includes('header')) {
          headerArr.push(field)
          return
        }
        if (component.includes('select')) {
          queryArr.push(field)
          return
        }
        if (component.includes('classicframe')) {
          blockFrameIndexMap[field.name] = {
            ...field['x-decorator-props'],
          }
          frameArr.push(field)
          return
        }
        blockArr.push(field)
      })
      // 优先根据格子找到对应的子集
      blockArr.forEach((block) => {
        const findFrame = frameArr.find((frame) => {
          const blockDecoratorProps = block['x-decorator-props']
          const frameDecoratorProps = frame['x-decorator-props']

          if (
            blockDecoratorProps.x >= frameDecoratorProps.x - offsetSize
            && blockDecoratorProps.y >= frameDecoratorProps.y - offsetSize
            && blockDecoratorProps.x + blockDecoratorProps.w
            <= frameDecoratorProps.x + frameDecoratorProps.w + offsetSize
            && blockDecoratorProps.y + blockDecoratorProps.h
            <= frameDecoratorProps.y + frameDecoratorProps.h + offsetSize
          ) {
            return true
          }
          else {
            return false
          }
        })

        if (findFrame) {
          if (blockFrameIndexMap[findFrame.name].children) {
            blockFrameIndexMap[findFrame.name].children.push(block)
          }
          else {
            blockFrameIndexMap[findFrame.name].children = [block]
          }
        }
        else {
          otherArr.push(block)
        }
      })

      let startY = 0
      const allArr = []

      headerArr.forEach((item) => {
        const itemDecoratorProps = item['x-decorator-props']
        const h = itemDecoratorProps.h || 0
        const newH = sizeFormat(h < 1.88 ? 1.88 : h + 0.2)
        item['x-decorator-props'] = {
          ...itemDecoratorProps,
          h: newH,
          x: 0,
          y: sizeFormat(startY, 2),
          w: 12,
        }
        startY += newH + 0.2
        allArr.push(item)
      })

      queryArr.forEach((item) => {
        const itemDecoratorProps = item['x-decorator-props']
        item['x-decorator-props'] = {
          ...itemDecoratorProps,
          x: 0.5,
          y: sizeFormat(startY, 2),
          w: 11,
        }
        startY += (itemDecoratorProps.h || 0) + 0.2
        allArr.push(item)
      })
      frameArr = frameArr.sort((a, b) => {
        const aDecoratorProps = a['x-decorator-props']
        const bDecoratorProps = b['x-decorator-props']

        return (
          aDecoratorProps.x
          + aDecoratorProps.y
          - (bDecoratorProps.x + bDecoratorProps.y)
        )
      })
      frameArr.forEach((item) => {
        const itemDecoratorProps = item['x-decorator-props']
        const h = itemDecoratorProps.h || 0
        const w = itemDecoratorProps.w || 0
        const children = blockFrameIndexMap?.[item.name]?.children
        const multipleNum = children?.length
          ? children?.length
          : w > 8
            ? 3
            : w > 4
              ? 2
              : 1
        const newH = h * multipleNum || 0

        item['x-decorator-props'] = {
          ...itemDecoratorProps,
          h: sizeFormat(newH, 2),
          x: 0.5,
          y: sizeFormat(startY, 2),
          w: 11,
        }

        if (children && children.length) {
          // 0.5111 头部的高度
          let childrenStartY = startY
          children.forEach((child, index) => {
            const childecoratorProps = child['x-decorator-props']
            const disOffsetHeaderSize = childecoratorProps.disOffsetHeaderSize
            const newY = sizeFormat(
              childrenStartY + (disOffsetHeaderSize ? 0 : 0.5111),
              2,
            )
            child['x-decorator-props'] = {
              ...childecoratorProps,
              x: 0.5,
              w: 11,
              y: newY,
            }
            childrenStartY = newY + childecoratorProps.h
            allArr.push(child)
          })
        }
        startY += newH + 0.2
        allArr.push(item)
      })

      otherArr.forEach((item) => {
        const itemDecoratorProps = item['x-decorator-props']
        item['x-decorator-props'] = {
          ...itemDecoratorProps,
          x: 0.5,
          y: sizeFormat(startY, 2),
          w: 11,
        }
        startY += (itemDecoratorProps.h || 0) + 0.2
        allArr.push(item)
      })

      return allArr
    }
    return []
  }, [
    Object.keys(fieldSchema.properties || {}).join(','),
    props?.isPc,
    props?.breakpoint,
    props?.width,
  ])
}
