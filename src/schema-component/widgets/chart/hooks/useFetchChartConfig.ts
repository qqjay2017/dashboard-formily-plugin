import { useRequest } from '@/api-client'
import { apiBase } from '@/utils'

export function useFetchChartConfig(chartId = '') {
  return useRequest(`${apiBase}/chart/${chartId}`, {
    method: 'GET',
    refreshDeps: [chartId],
    enabled: !!chartId,
  })
}
