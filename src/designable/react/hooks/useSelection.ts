import { useOperation } from './useOperation'

export function useSelection(workspaceId?: string) {
  const operation = useOperation(workspaceId)
  return operation?.selection
}
