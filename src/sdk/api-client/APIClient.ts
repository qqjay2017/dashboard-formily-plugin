import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

import qs from "qs";
import { get } from "lodash-es";
import type { APIClientOptions } from "./types";

interface InternalAxiosRequestConfig<D> extends AxiosRequestConfig<D> {
  dataPath?: string;
}

class APIClientSdk {
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

  request<T = any, R = any, D = any>(
    config: InternalAxiosRequestConfig<D>
  ): Promise<R> {
    if (!config.method || config.method.toLowerCase() === "get") {
      return this.axios.get<T, R, D>(config.url, {
        ...config,
      });
    }

    return this.axios.request<T, R, D>({
      ...config,
    });
  }
}

export default APIClientSdk;
