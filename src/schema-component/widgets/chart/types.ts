import type { DataSourceBindType } from '@/schema-component/types'
import type { SchemComponentWithDataSourceProps } from '@/types'

export interface ChartTemplateProps extends SchemComponentWithDataSourceProps {
  chartId?: string
  apiInfo?: DataSourceBindType
}
