import { defaultChartTemplate } from "./consts";
import type { APiWrap } from "@/api-client";
import { useAPIClient } from "@/api-client";
import { apiBase } from "@/utils";

export function useEditChartApi() {
  const apiClient = useAPIClient();
  return ({
    isCreate,
    values,
    chartId,
  }: {
    isCreate?: boolean;
    values?: any;
    chartId?: any;
  }) => {
    return apiClient.request<any, APiWrap<{ id: number }>>({
      url: isCreate ? `${apiBase}/chart` : `${apiBase}/chart/${chartId}`,
      method: isCreate ? "POST" : "PUT",
      data: {
        ...values,
        id: chartId,
        content: isCreate ? defaultChartTemplate : values.content,
      },
    });
  };
}
