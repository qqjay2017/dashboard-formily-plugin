import { createContext } from "react";
import type { Schema } from "@formily/react";
import type { BreakpointKey } from "@/schema-component/types";

export interface DashboardRootRendererContextValue {
  breakpoint: BreakpointKey;
  colWidth: number;
  rowHeight: number;
  isPc: boolean;
  designWidth?: number;
  designHeight?: number;
  themeProvider?: string;
  scale: number;

  mobileRowHeight: number;
  width?: number;
}

export const DashboardRootContext =
  createContext<DashboardRootRendererContextValue | null>(null);
