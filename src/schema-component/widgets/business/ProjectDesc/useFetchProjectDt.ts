import { useRequest } from '@/api-client'

export function useFetchProjectDt(projectId = '') {
  return useRequest(
    `/api/project-system/v1/project/${projectId}/3
`,
    {
      method: 'GET',
      refreshDeps: [projectId],
      enabled: !!projectId,
      headers: {
        'system-id': '82522199059099734',
      },
    },
  )
}
