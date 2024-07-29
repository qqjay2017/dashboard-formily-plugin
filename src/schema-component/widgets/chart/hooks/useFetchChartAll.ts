import { useRequest } from "@/api-client";
import { apiBase } from "@/utils";

export function useFetchChartAll() {
  return useRequest(`${apiBase}/chart`, {
    method: "GET",
  });
}
