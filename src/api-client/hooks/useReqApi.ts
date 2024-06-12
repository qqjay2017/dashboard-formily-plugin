
import { useAPIClient } from './useAPIClient'

export const useReqApiProxy = () => {
    const apiClient = useAPIClient()
    const request = ({ apiId, data = {}, headers = {} }: {
        apiId: string;
        data?: any;
        headers?: any
    }) => {
        return apiClient.request({
            method: 'post',
            url: "/huang-api/api-proxy/proxy",
            data: {
                apiId,
                data,
                origin: location.origin,
                headers
            },

        })
    }
    return {
        request
    }
}
