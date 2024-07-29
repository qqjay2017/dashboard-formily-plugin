import { useWorkspace } from "./useWorkspace";

export function useOperation(workspaceId?: string) {
  const workspace = useWorkspace(workspaceId);
  return workspace?.operation;
}
