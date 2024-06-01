


/**
 * 方便二次加工
 */

import { useQuery } from '@tanstack/react-query'
import { useApp } from '../../application/hooks'

export { useQuery } from '@tanstack/react-query'


export interface UseRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: any;
  data?: any;
  refreshDeps?: any[]

}

export type APiWrap<T> = {
  data: T;
}

export function useRequest<D = any>(url?: string, options?: UseRequestOptions) {
  const app = useApp()
  const {
    method,
    params,
    data,
    refreshDeps = []
  } = options

  return useQuery({
    queryKey: [
      url,
      method,
      ...refreshDeps
    ],
    queryFn: () => app.apiClient.request<any, D>({
      url,
      method,
      params,
      data
    })
  })
}