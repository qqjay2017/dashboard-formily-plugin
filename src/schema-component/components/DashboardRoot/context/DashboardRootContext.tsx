import { createContext } from "react";
import { BreakpointKey } from "../../PositionDecorator/types";
import { Schema } from "@formily/react";

export interface DashboardRootRendererContextValue {
  breakpoint: BreakpointKey;
  colWidth: number;
  rowHeight: number;
  isPc: boolean;
  designWidth: number;
  designHeight: number;
  themeProvider: string;
  scale: number;
  rootFieldSchema?: Schema;
  mobileRowHeight: number;
}

export const DashboardRootContext =
  createContext<DashboardRootRendererContextValue | null>(null);
