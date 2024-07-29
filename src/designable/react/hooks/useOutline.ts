import { useWorkspace } from "./useWorkspace";

export function useOutline(workspaceId?: string) {
  const workspace = useWorkspace(workspaceId);
  return workspace?.outline;
}
