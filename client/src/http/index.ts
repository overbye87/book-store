import axios, { AxiosRequestConfig } from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem("accessToken");
  if (token != null) {
    //config.headers.authorization = `Bearer ${token}`;
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      //"Content-Type": "multipart/form-data",
    };
  }
  return config;
};

$host.interceptors.request.use(authInterceptor);

export { $host };
