import { useSelection } from "./useSelection";

export function useSelected(workspaceId?: string) {
  const selection = useSelection(workspaceId);
  return selection?.selected || [];
}
