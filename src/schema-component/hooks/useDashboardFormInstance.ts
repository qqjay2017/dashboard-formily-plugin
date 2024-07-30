import { useMemo } from 'react'
import { createForm } from '@formily/core'

import { useProjectSelectScope } from '../widgets'

export function useDashboardFormInstance({
  designable,
}: {
  designable?: boolean
}) {
  /**
   * 初始化好数据
   */
  const projectSelectScope = useProjectSelectScope()
  const form = useMemo(() => {
    return createForm({
      designable,
      effects: () => {
      },
    })
  }, [])
  if (!projectSelectScope) {
    return null
  }

  return form
}
