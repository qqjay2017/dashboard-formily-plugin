import type { DashboardItem } from "./types";
import type { APiWrap } from "@/api-client";
import { useRequest } from "@/api-client";
import { apiBase } from "@/utils";

export function useDashboardAll() {
  return useRequest<APiWrap<DashboardItem[]>>(`${apiBase}/designer`, {
    method: "GET",
  });
}
