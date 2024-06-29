import React from 'react'
import { useParams } from 'react-router-dom';
import { useAPIClient } from '../../api-client';
import { apiBase } from '@/utils';

export const useUpdateDashboard = () => {
    const apiClient = useAPIClient()
    const { id } = useParams();
    async function updateDashboard(data: any) {
        return apiClient.request({
            url: `${apiBase}/dashboard/` + id,
            method: "put",
            data
            // {
            //     // id,
            //     content: JSON.stringify({
            //         type: "void",
            //         properties: {
            //             dashboardRoot: (schema || fieldSchema).toJSON(),
            //         },
            //     }),
            // },
        });
    }

    return {
        id,
        updateDashboard
    }
}
