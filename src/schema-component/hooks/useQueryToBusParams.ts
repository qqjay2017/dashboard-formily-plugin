import { useMemo } from 'react'
import type { SchemaQueryType } from '../types'
import { useJfGlobalProjectStore } from './useJfGlobalProjectStore'

export function useQueryToBusParams(query: SchemaQueryType): null | {
  quarterId?: string
  quarterName?: string
  projectId?: string
  projectName?: string
} {
  const { quarter, project } = useJfGlobalProjectStore()
  return useMemo(() => {
    if (!quarter && !project) {
      return null
    }
    return {
      quarterId: quarter?.quarterId || undefined,
      quarterName: quarter?.quarterName || undefined,
      projectId: project?.id || undefined,
      projectName: project?.name || undefined,
    }
  }, [
    quarter,
    project,
  ])
}
