import type { SysColumns } from "@/client-pages/types";

export interface DashboardItem extends SysColumns {
  name: string;
  description: string;
  content: string;

  coverThumbnail?: string;

  appGroupId?: string;
  appGroupName?: string;
  [property: string]: any;
}
