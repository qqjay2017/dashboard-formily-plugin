import { useOperation } from "./useOperation";

export function useTree(workspaceId?: string) {
  const operation = useOperation(workspaceId);
  return operation?.tree;
}
