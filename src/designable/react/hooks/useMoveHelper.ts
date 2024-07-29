import { useOperation } from './useOperation'

export function useMoveHelper(workspaceId?: string) {
  const operation = useOperation(workspaceId)
  return operation?.moveHelper
}
