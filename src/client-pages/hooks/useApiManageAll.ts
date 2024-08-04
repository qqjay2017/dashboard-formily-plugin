import type { IApiManageItem } from "../pages/api/types";
import { useRequest } from "@/api-client";
import { apiBase } from "@/utils";

export function useApiManageAll(type = undefined) {
  return useRequest<IApiManageItem[]>(`${apiBase}/api-manage`, {
    refreshDeps: [type],
    method: "GET",
    params: {
      type,
    },
  });
}
