import type { Schema } from '@formily/react'
import type { PropsWithChildren } from 'react'

export type BreakpointKey = 'showroom' | 'desktop' | 'tablet' | 'mobile'

export type Breakpoints = Record<BreakpointKey, number>

export interface DashboardRootRendererContextValue {
  breakpoint: BreakpointKey
  colWidth: number
  rowHeight: number
  isPc: boolean
  designWidth: number
  designHeight: number
  themeProvider: string
  scale: number
  rootFieldSchema: Schema
  mobileRowHeight: number
}

export interface DashboardComponentContextValue {
  refresh?: () => void
  designable?: boolean
  setDesignable?: (value: boolean) => void
  distributed?: boolean
  handleIds?: string[]
  setHandleIds?: React.Dispatch<React.SetStateAction<string[]>>
}

export interface PositionDecoratorOptions {
  w: number
  h: number
  x: number
  y: number
  minW?: number
  maxW?: number
  minH?: number
  maxH?: number
  padding?: number | string | number[]
  overflowHidden?: boolean
  style?: React.CSSProperties
  zIndex?: number
  className?: string
  elementId?: string
  isSelected?: boolean
}

export interface SchemaToolbarProps extends PropsWithChildren {
  title?: string | string[]
  draggable?: boolean
  resizable?: boolean

  /**
   * @default true
   */
  showBorder?: boolean
  showBackground?: boolean
}
