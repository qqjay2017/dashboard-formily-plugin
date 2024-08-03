import type { IApiManageItem } from "./types";
import type { APiWrap } from "@/api-client";
import { useAPIClient } from "@/api-client";
import { apiBase } from "@/utils";

export function useRemoveAppManage() {
  const apiClient = useAPIClient();
  return (dto?: Partial<IApiManageItem>) => {
    return apiClient.request<IApiManageItem, APiWrap<{ id: number }>>({
      url: `${apiBase}/api-manage/${dto?.id}`,
      method: "delete",
      data: dto,
    });
  };
}
