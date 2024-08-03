import type { AppGroupItem } from "./types";
import type { APiWrap } from "@/api-client";
import { useAPIClient } from "@/api-client";
import { apiBase } from "@/utils";

export function useRemoveAppGroupApi() {
  const apiClient = useAPIClient();
  return (dto?: Partial<AppGroupItem>) => {
    return apiClient.request<AppGroupItem, APiWrap<{ id: number }>>({
      url: `${apiBase}/app-group/${dto?.id}`,
      method: "delete",
      data: dto,
    });
  };
}
