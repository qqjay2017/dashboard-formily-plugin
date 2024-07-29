import type { Form } from '@formily/core'
import type {
  IRecursionFieldProps,
  ISchemaFieldProps,
  SchemaReactComponents,
} from '@formily/react'
import type { PropsWithChildren } from 'react'
import type React from 'react'
import type { BreakpointKey } from './components/PositionDecorator/types'

export interface ISchemaComponentContext {
  formId?: string
  scope?: any
  components?: SchemaReactComponents
  refresh?: () => void
  reset?: () => void
  designable?: boolean
  setDesignable?: (value: boolean) => void
  SchemaField?: React.FC<ISchemaFieldProps>
  distributed?: boolean
  breakpoint?: BreakpointKey
}

export interface ISchemaComponentProvider {
  designable?: boolean
  onDesignableChange?: (value: boolean) => void
  form?: Form
  scope?: any
  components?: SchemaReactComponents
  children?: React.ReactNode
}

export interface IRecursionComponentProps extends IRecursionFieldProps {
  scope?: any
  components?: SchemaReactComponents
}

export interface ISchemaComponentOptionsProps extends PropsWithChildren {
  scope?: any
  components?: SchemaReactComponents
  inherit?: boolean
}

export type DataSourceBindType = {
  dataSourceId?: string

  dataSourceName?: string
  afterScript?: string
  beforeScript?: string
} | null

export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type SchemaQueryType = {
  quarterSelect?: {
    queryType?: string
    quarterId?: string
    quarterName?: string
  }
  projectSelect?: {
    id: string
    name: string
  }
} | null
