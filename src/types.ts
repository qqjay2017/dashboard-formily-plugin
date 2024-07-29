import type { DataSourceBindType, SchemaQueryType } from './schema-component/types'

export interface FormItemComponentProps<V = any> {
  onChange?: (v: V) => void
  value?: V
  onBlur?: any
  dataSource?: any[]
}

export interface ApiGroupItem {
  id: string
  createdAt: string
  name: string
}

export interface SchemComponentWithDataSourceProps {
  dataSource: DataSourceBindType
  query: SchemaQueryType
}
