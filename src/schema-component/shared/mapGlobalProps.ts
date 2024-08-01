import { mapProps } from '@formily/react'
import React from 'react'
import { useProjectSelectScope } from '../widgets'

function mapGlobalProps() {
    return mapProps({}, (props, field: any) => {
        const projectScope = useProjectSelectScope()

        return {
            query: {
                projectSelect: projectScope?.firstProject,
            },

            // dataSource: field.dataSource,
        }
    })
}

export default mapGlobalProps
