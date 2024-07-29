import { useWorkspace } from "./useWorkspace";

export function useHistory(workspaceId?: string) {
  const workspace = useWorkspace(workspaceId);
  return workspace?.history;
}
