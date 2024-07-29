import { createContext } from 'react'
import type { Schema } from '@formily/react'
import type { BreakpointKey } from '../../PositionDecorator/types'

export interface DashboardRootRendererContextValue {
  breakpoint: BreakpointKey
  colWidth: number
  rowHeight: number
  isPc: boolean
  designWidth: number
  designHeight: number
  themeProvider: string
  scale: number
  rootFieldSchema?: Schema
  mobileRowHeight: number
}

export const DashboardRootContext
  = createContext<DashboardRootRendererContextValue | null>(null)
