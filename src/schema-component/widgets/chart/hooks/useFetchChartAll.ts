import { useRequest } from "@/api-client";
import type { IChartItem } from "@/client-pages/pages/charts/types";
import { apiBase } from "@/utils";

export function useFetchChartAll(type?: string) {
  return useRequest<IChartItem[]>(`${apiBase}/chart`, {
    method: "GET",
    params: {
      type,
    },
    refreshDeps: [type],
  });
}

export function useFetchChartAllList({
  type,
  pageNum,
  pageSize,
}: {
  type?: string;
  pageNum?: number | string;
  pageSize?: number | string;
}) {
  return useRequest<{
    rows: IChartItem[];
    total: number;
  }>(`${apiBase}/chart/list`, {
    method: "GET",
    params: {
      type,
      pageNum,
      pageSize,
    },
    refreshDeps: [type, pageNum, pageSize],
  });
}
