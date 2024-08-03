import { useParams } from "react-router-dom";

import type { DashboardItem } from "./types";
import type { APiWrap } from "@/api-client";
import { useRequest } from "@/api-client";

import { apiBase } from "@/utils";

export function useDashboardDt() {
  const { id } = useParams();

  const params = useRequest<APiWrap<DashboardItem>>(
    `${apiBase}/designer/${id}`,
    {
      method: "GET",
      refreshDeps: [id],
    }
  );

  return {
    ...params,
    id,
  };
}
