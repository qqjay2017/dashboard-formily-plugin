import { createContext } from "react"
import { DashboardRootRendererContextValue } from "../types";






export const DashboardRootContext = createContext<DashboardRootRendererContextValue | null>(null)
