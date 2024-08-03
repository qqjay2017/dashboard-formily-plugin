import type { DashboardItem } from "./types";
import type { APiWrap } from "@/api-client";
import { useRequest } from "@/api-client";
import { useTypeParam } from "@/client-pages/hooks";
import { apiBase } from "@/utils";

export function useDashboardAll() {
  const { typeParam } = useTypeParam();
  console.log(typeParam, "typeParam");
  return useRequest<APiWrap<DashboardItem[]>>(`${apiBase}/designer`, {
    method: "GET",
    refreshDeps: [typeParam],
    params: {
      appGroupId: !typeParam || typeParam === "all" ? undefined : typeParam,
    },
  });
}
