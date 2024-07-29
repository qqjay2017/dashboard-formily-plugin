import { useOperation } from './useOperation'

export function useHover(workspaceId?: string) {
  const operation = useOperation(workspaceId)
  return operation?.hover
}
