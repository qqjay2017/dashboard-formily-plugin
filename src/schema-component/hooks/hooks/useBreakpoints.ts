import { useCallback, useMemo, useState } from 'react'
import useResizeObserver from 'use-resize-observer'

import { debounce } from 'lodash-es'

import { defaultBreakpoints, getBreakpointFromWidth } from '@/utils/utils'
import type { BreakpointKey, Breakpoints } from '@/schema-component/types'

export function useBreakpoints(
  breakpoints: Breakpoints = defaultBreakpoints,
  wait = 800,
  reff?: any,
) {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>(
    '' as BreakpointKey,
  )
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  // 防抖
  const setSize = useCallback(
    ({ width = 0, height = 0 }: { width?: number, height?: number }) => {
      setWidth(width)
      setHeight(height)
      setBreakpoint(getBreakpointFromWidth(breakpoints, width))
    },
    [breakpoints],
  )

  const onResize = useMemo(
    () => debounce(setSize, wait, { leading: true }),
    [wait, setSize],
  )
  const { ref } = useResizeObserver({
    ref: reff || undefined,
    onResize,
  })

  return { breakpoint, width, height, ref }
}
