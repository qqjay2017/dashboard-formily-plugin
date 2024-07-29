import { useWorkspace } from "./useWorkspace";

export function useViewport(workspaceId?: string) {
  const workspace = useWorkspace(workspaceId);
  return workspace?.viewport;
}
