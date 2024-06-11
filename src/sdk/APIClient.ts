
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import qs from 'qs';

interface ExtendedOptions {
    authClass?: any;

}
export type APIClientOptions = AxiosInstance | (AxiosRequestConfig & ExtendedOptions);

export class APIClientSdk {
    axios: AxiosInstance;
    constructor(instance?: APIClientOptions) {
        if (typeof instance === 'function') {
            this.axios = instance;
        } else {
            const { authClass, ...others } = instance || {};
            this.axios = axios.create(others);

        }
        this.interceptors();
    }
    interceptors() {
        // 基础拦截
        this.axios.interceptors.request.use((config) => {
            config.paramsSerializer = (params) => {
                return qs.stringify(params, {
                    strictNullHandling: true,
                    arrayFormat: 'brackets',
                });
            };
            return config;
        });

    }
    request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {

        return this.axios.request<T, R, D>(config);
    }
}