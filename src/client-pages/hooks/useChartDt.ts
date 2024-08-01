import { useRequest } from '@/api-client'
import { apiBase } from '@/utils'

export function useChartDt({ id }: { id: string }) {
  return useRequest(`${apiBase}/chart/${id}`, {

  })
}
