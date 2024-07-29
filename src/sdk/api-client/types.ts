import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface ExtendedOptions {
    authClass?: any
}
export type APIClientOptions =
    | AxiosInstance
    | (AxiosRequestConfig & ExtendedOptions)
