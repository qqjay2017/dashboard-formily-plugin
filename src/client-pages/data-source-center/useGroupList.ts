import { APiWrap, useAPIClient, useQuery } from '@/api-client';
import { apiBase } from '@/utils';


export const useGroupList = () => {
    const apiClient = useAPIClient();
    return useQuery<any, APiWrap<{}[]>>({
        queryKey: ["getApiGroup"],
        queryFn: () =>
            apiClient.request({
                url: `${apiBase}/api-manage/group/list`,
                method: "get",
            }),
    });
}
