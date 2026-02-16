import type { AxiosInstance, AxiosRequestHeaders } from 'axios';

export const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      config.headers = {} as unknown as AxiosRequestHeaders;
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
};
