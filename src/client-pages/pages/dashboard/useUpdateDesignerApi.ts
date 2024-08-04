import type { DashboardItem } from "./types";

import { useUpdateDashboard } from "@/schema-component/hooks";
import { apiBase } from "@/utils";

export function useUpdateDesignerApi() {
  const { updateDashboard } = useUpdateDashboard();

  return (dto?: Partial<DashboardItem>) => {
    return updateDashboard(dto, dto.id);
  };
}
