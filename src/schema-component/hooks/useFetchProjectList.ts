import React from 'react'
import { useRequest } from '@/api-client'
import { getCompanyId } from '@/utils'

export function useFetchProjectList({ staleTime = true }: { staleTime?: boolean }) {
    return useRequest('/api/project-system/v1/project/table', {
        method: 'POST',
        headers: {
            'system-id': '1',
        },
        staleTime: staleTime ? 1000 * 60 * 5 : undefined,

        data: {
            authFlag: true,
            companyId: getCompanyId(),
            pageNum: 1,
            pageSize: 200,
        },

    })
}
