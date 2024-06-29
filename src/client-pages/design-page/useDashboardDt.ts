import { APiWrap, useRequest } from '@/api-client';
import { DashboardItem } from '@/demo/types';
import { apiBase } from '@/utils';
import { useParams } from 'react-router-dom'

export const useDashboardDt = () => {
    const { id } = useParams()
    return useRequest<APiWrap<DashboardItem>>(
        `${apiBase}/dashboard/${id}`,
        {
            method: "GET",
            refreshDeps: [id],
        }
    );
}
