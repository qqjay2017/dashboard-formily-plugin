import { createContext } from "react";
import { DashboardComponentContextValue } from "../../PositionDecorator/types";

export const DashboardComponentContext =
  createContext<DashboardComponentContextValue>({});
