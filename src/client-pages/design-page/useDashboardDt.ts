import { useParams } from 'react-router-dom'

import type { DashboardItem } from '../pages/dashboard/types'
import type { APiWrap } from '@/api-client'
import { useRequest } from '@/api-client'

import { apiBase } from '@/utils'

export function useDashboardDt() {
  const { id } = useParams()
  // const { reset } = useSchemaComponentContext()

  const params = useRequest<APiWrap<DashboardItem>>(
    `${apiBase}/dashboard/${id}`,
    {
      method: 'GET',
      refreshDeps: [id],
    },
  )

  return {
    ...params,
    id,
  }
  //
  // useEffect(() => {
  //     function refetchApi() {
  //         params.refetch().then(() => {

  //             reset && reset()
  //         })
  //     }

  //     document.addEventListener('resetJson', refetchApi)
  //     return () => {
  //         document.removeEventListener('resetJson', refetchApi)
  //     }
  // }, [])

  // return params
}
