import { useMemo } from 'react'
import { createForm, onFieldReact, onFieldValueChange } from '@formily/core'
import { useProjectSelectScope } from '../widgets'

import { isNeedQueryInject } from '@/designable/core'

export function useDashboardFormInstance() {
  const projectSelectScope = useProjectSelectScope()
  const form = useMemo(() => {
    if (!projectSelectScope) {
      return null
    }
    return createForm({
      initialValues: {
        projectSelect: projectSelectScope?.firstProject,
        quarterSelect: projectSelectScope?.currentQuarter,
      },
      effects: () => {
        // 切换值
        onFieldValueChange('*(projectSelect,quarterSelect)', (field) => {
          if (!form) {
            return false
          }

          form.setFieldState('*', (state: any) => {
            if (isNeedQueryInject(state.props.name)) {
              state.componentProps.query = {
                ...state.componentProps.query,
                [state.props.name]: {
                  ...field.value,
                },
              }
            }
          })
        })

        // 回显值
        onFieldReact('*', (field) => {
          if (isNeedQueryInject(field.props.name as string)) {
            field.componentProps.query = {
              projectSelect: field.query('projectSelect').value(),
              quarterSelect: field.query('quarterSelect').value(),
            }
          }
        })
        onFieldReact('projectSelect', (field: any) => {
          field.componentProps.dataSource = projectSelectScope?.projectList || []
        })
      },
    })
  }, [projectSelectScope?.firstProject?.id, projectSelectScope?.projectList?.length])
  if (!projectSelectScope) {
    return null
  }

  return form
}
