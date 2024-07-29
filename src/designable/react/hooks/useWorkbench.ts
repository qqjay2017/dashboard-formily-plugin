import { useDesigner } from './useDesigner'

export function useWorkbench() {
  const designer = useDesigner()
  return designer.workbench
}
