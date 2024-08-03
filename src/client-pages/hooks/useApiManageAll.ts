import { useRequest } from "@/api-client";
import { apiBase } from "@/utils";

export function useApiManageAll(type = undefined) {
  return useRequest(`${apiBase}/api-manage`, {
    refreshDeps: [type],
    method: "GET",
    params: {
      type,
    },
  });
}
