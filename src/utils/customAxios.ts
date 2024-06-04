import axios, { AxiosError } from "axios";

import axiosRetry from "axios-retry";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  withCredentials: true,
});

axiosRetry(instance, {
  retryDelay: (retryCount: number): number => {
    return retryCount * 1000; // 1 second * retryCount
  },
  retryCondition: (error: AxiosError): boolean => {
    return (
      (error?.response?.data as { message: string })?.message ===
      "Refresh access token successfully"
    );
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
