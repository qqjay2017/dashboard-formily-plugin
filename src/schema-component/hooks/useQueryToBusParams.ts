import { useMemo } from 'react'
import type { SchemaQueryType } from '../types'

export function useQueryToBusParams(query: SchemaQueryType): null | {
  quarterId?: string
  quarterName?: string
  projectId?: string
  projectName?: string
} {
  return useMemo(() => {
    if (!query?.quarterSelect?.quarterId && !query?.projectSelect?.id) {
      return null
    }
    return {
      quarterId: query?.quarterSelect?.quarterId || undefined,
      quarterName: query?.quarterSelect?.quarterName || undefined,
      projectId: query?.projectSelect?.id || undefined,
      projectName: query?.projectSelect?.name || undefined,
    }
  }, [
    query?.quarterSelect?.quarterId,
    query?.projectSelect?.id,
    query?.projectSelect?.name,
  ])
}
