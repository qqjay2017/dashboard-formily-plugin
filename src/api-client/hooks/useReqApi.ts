
import { useAPIClient } from './useAPIClient'

export const useReqApiProxy = () => {
    const apiClient = useAPIClient()
    const request = ({ apiId, data = {} }: {
        apiId: string;
        data?: any
    }) => {
        return apiClient.request({
            method: 'post',
            url: "/huang-api/api-proxy/proxy",
            data: {
                apiId,
                data,
                origin: location.origin
            }
        })
    }
    return {
        request
    }
}
