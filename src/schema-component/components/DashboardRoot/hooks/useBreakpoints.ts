import { useCallback, useMemo, useState } from "react";
import useResizeObserver from "use-resize-observer";



import { debounce } from "lodash-es";


import { BreakpointKey, Breakpoints } from "../types";
import { defaultBreakpoints, getBreakpointFromWidth } from "../utils";

export const useBreakpoints = (

  breakpoints: Breakpoints = defaultBreakpoints,
  wait = 800
) => {

  const [breakpoint, setBreakpoint] = useState<BreakpointKey>('desktop');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  // 防抖
  const setSize = useCallback(
    ({ width = 0, height = 0 }: { width?: number; height?: number }) => {
      setWidth(width);
      setHeight(height);
      setBreakpoint(getBreakpointFromWidth(breakpoints, width) || "desktop");
    },
    [breakpoints]
  );

  const onResize = useMemo(
    () => debounce(setSize, wait, { leading: true }),
    [wait, setSize]
  );
  const { ref } = useResizeObserver({
    // ref: document.body,
    onResize: onResize,
  });

  return { breakpoint: breakpoint, width, height, ref };
};
