/**
 * 方便二次加工
 */

import { useQuery } from '@tanstack/react-query'
import { useApp } from '../../application/hooks'

export { useQuery } from '@tanstack/react-query'

export interface UseRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: any
  data?: any
  refreshDeps?: any[]
  headers?: any
  enabled?: boolean

}

export interface APiWrap<T> {
  data: T
}

export function useRequest<D = any>(url?: string, options: UseRequestOptions = { method: 'GET' }) {
  const app = useApp()
  const {
    method,
    params,
    data,
    refreshDeps = [],
    headers,
    ...other
  } = options

  return useQuery({
    queryKey: [
      url,
      method,
      ...refreshDeps,
    ],

    queryFn: () => app.apiClient.request<any, D>({
      url,
      method,
      params,
      data,
      headers,

      ...other,
    }),

  })
}
