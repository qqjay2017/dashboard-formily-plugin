
import { useAPIClient } from './useAPIClient'

export const useReqApiProxy = () => {
    const apiClient = useAPIClient()
    const request = ({ apiId, data = {}, headers = {}, formValues }: {
        apiId: string;
        data?: any;
        headers?: any;
        formValues?: any;
    }) => {
        return apiClient.request({
            method: 'post',
            url: apiId ? "/huang-api/api-proxy/proxy" : "/huang-api/api-proxy/proxy-test",
            data: {
                formValues,
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
