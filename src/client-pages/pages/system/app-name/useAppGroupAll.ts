import type { AppGroupItem } from "./types";
import type { APiWrap } from "@/api-client";
import { useRequest } from "@/api-client";
import { apiBase } from "@/utils";

export function useAppGroupAll() {
  return useRequest<APiWrap<AppGroupItem[]>>(`${apiBase}/app-group`, {
    method: "GET",
  });
}
