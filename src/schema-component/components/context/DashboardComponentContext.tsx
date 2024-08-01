import { createContext } from "react";

export interface DashboardComponentContextValue {
  refresh?: () => void;
  designable?: boolean;
  setDesignable?: (value: boolean) => void;
  distributed?: boolean;
  handleIds?: string[];
  setHandleIds?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DashboardComponentContext =
  createContext<DashboardComponentContextValue>({});
