import { get } from 'lodash-es'
import { useEffect } from 'react'
import { useJfGlobalProjectStore } from './useJfGlobalProjectStore'
import { useRequest } from '@/api-client'
import { getCompanyId } from '@/utils'

export function useProjectSelectScope() {
  const { projectId, setProject, quarter } = useJfGlobalProjectStore()
  const { data } = useRequest('/api/project-system/v1/project/table', {
    method: 'POST',
    headers: {
      'system-id': '1',
    },

    data: {
      authFlag: true,
      companyId: getCompanyId(),
      pageNum: 1,
      pageSize: 200,
    },

  })

  const projectList = get(data, 'data.data.table.rows', []) || []
  const findDefaultProject = projectId ? projectList.find(f => f.id === projectId) : null
  let firstProject = null
  if (findDefaultProject) {
    firstProject = findDefaultProject
  }
  else {
    firstProject = get(data, 'data.data.table.rows[0]', null)
  }
  /**
   * TODO
   * 这个effect待测试
   */
  useEffect(() => {
    if (firstProject && firstProject.id) {
      if (firstProject.id !== projectId) {
        console.log('执行设值')
        setProject(firstProject)
      }
    }
  }, [firstProject?.id, projectId])

  if (!data) {
    return null
  }

  return {
    projectList,
    firstProject,
    currentQuarter: quarter,

  }
}
