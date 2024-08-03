import type { DashboardItem } from "./types";
import type { APiWrap } from "@/api-client";
import { useAPIClient } from "@/api-client";
import { apiBase } from "@/utils";

export function useUpdateDesignerApi() {
  const apiClient = useAPIClient();
  return (dto?: Partial<DashboardItem>) => {
    return apiClient.request<DashboardItem, APiWrap<{ id: number }>>({
      url: `${apiBase}/designer`,
      method: dto?.id ? "PUT" : "POST",
      data: dto,
    });
  };
}
