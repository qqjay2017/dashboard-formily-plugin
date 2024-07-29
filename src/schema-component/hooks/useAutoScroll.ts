import { useEffect, useRef } from 'react'

export function useAutoScroll(scrollSpeed = 1, delay = 16, ready = true) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const scrollElement = scrollRef.current

    if (!scrollElement || !ready)
      return

    const step = () => {
      if (
        scrollElement.scrollTop + scrollElement.clientHeight
        >= scrollElement.scrollHeight
      ) {
        scrollElement.scrollTop = 0
      }
      else {
        scrollElement.scrollTop += scrollSpeed
      }

      timeoutRef.current = setTimeout(step, delay)
    }

    timeoutRef.current = setTimeout(step, delay)

    return () => {
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current)
    }
  }, [scrollSpeed, ready, delay])

  return scrollRef
}
