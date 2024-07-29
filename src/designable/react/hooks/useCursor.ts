import { useDesigner } from './useDesigner'

export function useCursor() {
  const designer = useDesigner()
  return designer.cursor
}
