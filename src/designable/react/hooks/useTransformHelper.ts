import { useOperation } from "./useOperation";

export function useTransformHelper(workspaceId?: string) {
  const operation = useOperation(workspaceId);
  return operation?.transformHelper;
}
