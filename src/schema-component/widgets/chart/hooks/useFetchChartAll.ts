import { useRequest } from "@/api-client";
import { apiBase } from "@/utils";

export function useFetchChartAll(type?: string) {
  return useRequest(`${apiBase}/chart`, {
    method: "GET",
    params: {
      type,
    },
    refreshDeps: [type],
  });
}
