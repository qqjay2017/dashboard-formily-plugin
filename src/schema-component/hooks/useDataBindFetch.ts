import { get } from 'lodash-es'
import { useMemo } from 'react'
import type { DataSourceBindType } from '../types'
import { useQuery, useReqApiProxy } from '@/api-client'

/**
 * TODO  数据源执行处理
 * @param dataSource
 * @returns
 */
export function useDataBindFetch(dataSource: DataSourceBindType, requestData?: any) {
  const { request } = useReqApiProxy()
  const { data, ...rest } = useQuery({
    queryKey: [
      'dataSourceQuery',
      dataSource?.dataSourceId,
      JSON.stringify(requestData || {}),
    ],
    enabled: !!dataSource?.dataSourceId,
    queryFn: () =>
      request
      && request({
        data: requestData,
        apiId: dataSource?.dataSourceId,
      }),
  })

  const dataMemo = useMemo(() => {
    if (!data || !dataSource?.dataSourceId || !dataSource?.afterScript) {
      return data
    }

    try {
      // 请求后脚本
      // eslint-disable-next-line no-new-func
      const afterScriptHandle = new Function(
        'apiRes',
        'context',
        dataSource.afterScript,
      )
      const r = afterScriptHandle(data, { get })
      if (typeof r === 'object') {
        return JSON.stringify(r)
      }
      return r
    }
    catch (error) {
      console.error(error, '函数执行报错')
      return data
    }
  }, [data, dataSource?.dataSourceId, dataSource?.afterScript])
  return {
    ...rest,
    data: dataMemo,
  }
}
