import type { DashboardItem } from "./types";
import type { APiWrap } from "@/api-client";
import { useRequest } from "@/api-client";
import { useTypeParam } from "@/client-pages/hooks";
import { apiBase } from "@/utils";

export function useDashboardAll() {
  const { typeParam } = useTypeParam();

  return useRequest<APiWrap<DashboardItem[]>>(`${apiBase}/designer`, {
    method: "GET",
    refreshDeps: [typeParam],
    params: {
      appGroupId: !typeParam || typeParam === "all" ? undefined : typeParam,
    },
  });
}

export function useDashboardList() {
  const { typeParam, pageNum, pageSize } = useTypeParam();

  return useRequest<{
    rows: DashboardItem[];
    total: number;
  }>(`${apiBase}/designer/list`, {
    method: "GET",
    refreshDeps: [typeParam, pageNum, pageSize],
    params: {
      appGroupId: !typeParam || typeParam === "all" ? undefined : typeParam,
      pageNum,
      pageSize,
    },
  });
}
