import type { DataSourceBindType } from '../types'

export function takeFirstApiInfo(apiInfo: DataSourceBindType | (DataSourceBindType[])): DataSourceBindType {
    return Array.isArray(apiInfo) ? apiInfo[0] : apiInfo
}
