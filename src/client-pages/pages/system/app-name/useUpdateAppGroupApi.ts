import type { AppGroupItem } from "./types";
import type { APiWrap } from "@/api-client";
import { useAPIClient } from "@/api-client";
import { apiBase } from "@/utils";

export function useUpdateAppGroupApi() {
  const apiClient = useAPIClient();
  return (dto?: Partial<AppGroupItem>) => {
    return apiClient.request<AppGroupItem, APiWrap<{ id: number }>>({
      url: dto?.id ? `${apiBase}/app-group/${dto?.id}` : `${apiBase}/app-group`,
      method: dto?.id ? "PUT" : "POST",
      data: dto,
    });
  };
}
