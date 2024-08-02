import { useMemo } from 'react'
import type { SchemaQueryType } from '../types'
import { useJfGlobalProjectStore } from './useJfGlobalProjectStore'

export interface QueryToBusParams {
  quarterId?: string
  quarterName?: string
  projectId?: string
  projectName?: string
}

export function useQueryToBusParams(queryKeys: string[] = []): null | QueryToBusParams {
  const { quarter, project } = useJfGlobalProjectStore()
  return useMemo(() => {
    if (!quarter && !project) {
      return null
    }
    const paramObj: QueryToBusParams = {

    }

    if (queryKeys.includes('projectSelect')) {
      paramObj.projectId = project?.id || undefined
      paramObj.projectName = project?.name || undefined
    }
    if (queryKeys.includes('quarterSelect')) {
      paramObj.quarterId = quarter?.quarterId || undefined
      paramObj.quarterName = quarter?.quarterName || undefined
    }
    return paramObj
  }, [
    quarter,
    project,
    queryKeys.length,
  ])
}
