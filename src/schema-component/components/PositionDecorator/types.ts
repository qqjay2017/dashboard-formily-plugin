import type { Schema } from '@formily/react'
import type { PropsWithChildren } from 'react'
import type { BreakpointKey } from '@/schema-component/types'

export interface DashboardRootRendererContextValue {
  breakpoint: BreakpointKey
  colWidth: number
  rowHeight: number
  isPc: boolean
  designWidth: number
  designHeight: number
  themeProvider: string
  scale: number

  mobileRowHeight: number
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
