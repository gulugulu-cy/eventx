import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
});

// 请求拦截器（比如加 token）
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器（比如统一处理 401、500 错误）
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 可以根据错误码做统一处理，比如跳转登录页
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;