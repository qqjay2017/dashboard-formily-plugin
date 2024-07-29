import { useCallback, useEffect, useMemo, useState } from 'react'
import { useViewport } from './useViewport'
import { useDesigner } from './useDesigner'
import type { TreeNode } from '@/designable/core'
import { CursorDragType, CursorStatus } from '@/designable/core'
import { LayoutObserver } from '@/designable/shared'

function isEqualRect(rect1: any, rect2: any) {
  return (
    rect1?.x === rect2?.x
    && rect1?.y === rect2?.y
    && rect1?.width === rect2?.width
    && rect1?.height === rect2?.height
  )
}

export function useValidNodeOffsetRect(node: TreeNode) {
  const engine = useDesigner()
  const viewport = useViewport()
  const [, forceUpdate] = useState(null)
  const rectRef = useMemo(
    () => ({ current: viewport.getValidNodeOffsetRect(node) }),
    [viewport],
  )

  const element = viewport.findElementById(node?.id)

  const compute = useCallback(() => {
    if (
      engine.cursor.status !== CursorStatus.Normal
      && engine.cursor.dragType === CursorDragType.Move
    ) {
      return
    }

    const nextRect = viewport.getValidNodeOffsetRect(node)
    if (!isEqualRect(rectRef.current, nextRect) && nextRect) {
      rectRef.current = nextRect
      forceUpdate([])
    }
  }, [viewport, node])

  useEffect(() => {
    const layoutObserver = new LayoutObserver(compute)
    if (element)
      layoutObserver.observe(element)
    compute()
    return () => {
      layoutObserver.disconnect()
    }
  }, [node, viewport, element])
  return rectRef.current
}
