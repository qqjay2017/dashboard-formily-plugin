import type { SysColumns } from "@/client-pages/types";

export interface AppGroupItem extends SysColumns {
  name: string;
  sortNum?: number;
  icon?: string;

  description?: string;
  [property: string]: any;
}
