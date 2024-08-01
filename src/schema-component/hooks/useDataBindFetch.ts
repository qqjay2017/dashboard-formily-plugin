import { get } from 'lodash-es'
import { useMemo } from 'react'
import type { DataSourceBindType } from '../types'
import { takeFirstApiInfo } from '../shared'
import { useQuery, useReqApiProxy } from '@/api-client'

/**
 * TODO  数据源执行处理
 * @param dataSource
 * @returns
 */
export function useDataBindFetch(apiInfo: DataSourceBindType | (DataSourceBindType[]), requestData?: any) {
  const dataSource = takeFirstApiInfo(apiInfo)
  const { request } = useReqApiProxy()
  const { data, ...rest } = useQuery({
    queryKey: [
      'dataSourceQuery',
      JSON.stringify(requestData || {}),
      JSON.stringify(dataSource),
    ],

    enabled: !!dataSource?.dataSourceId,
    queryFn: () =>
      request
      && request({
        data: requestData,
        apiId: dataSource?.dataSourceId,
      }),
  })

  // const dataMemo = useMemo(() => {

  //   if (!data || !dataSource?.dataSourceId || !dataSource?.afterScript) {

  //   }

  //   try {
  //     // 请求后脚本
  //     // eslint-disable-next-line no-new-func
  //     const afterScriptHandle = new Function(
  //       'apiRes',
  //       'context',
  //       dataSource.afterScript,
  //     )
  //     const r = afterScriptHandle(data, { get })
  //     if (typeof r === 'object') {
  //       return JSON.stringify(r)
  //     }
  //     return r
  //   }
  //   catch (error) {
  //     console.error(error, '函数执行报错')
  //     return data
  //   }
  // }, [data])
  return {
    ...rest,
    data,
  }
}
