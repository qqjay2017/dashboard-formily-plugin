import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

import qs from "qs";

interface ExtendedOptions {
  authClass?: any;
}
export type APIClientOptions =
  | AxiosInstance
  | (AxiosRequestConfig & ExtendedOptions);

export class APIClientSdk {
  axios: AxiosInstance;
  constructor(instance?: APIClientOptions) {
    if (typeof instance === "function") {
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
      config.headers.set("fp", localStorage.getItem("fp") || "");
      config.headers.set("pt", sessionStorage.getItem("pt") || "1");
      config.headers.set("ct", localStorage.getItem("ct") || "1");
      if (sessionStorage.getItem("ACCESS_TOKEN")) {
        config.headers.set(
          "Authorization",
          `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
        );
      }
      config.paramsSerializer = (params) => {
        return qs.stringify(params, {
          strictNullHandling: true,
          arrayFormat: "brackets",
        });
      };
      return config;
    });
  }

  request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.request<T, R, D>(config);
  }
}
