// src/http.ts
import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import uniAdapter from 'uni-axios-adapter-all';

axios.defaults.adapter = uniAdapter;

// 创建 Axios 实例
const http: AxiosInstance = axios.create({
  baseURL: '/api', // API 基础路径，可以从环境变量中获取
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求发送之前做些什么
    const token = localStorage.getItem('token'); // 假设 token 存储在 localStorage 中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 添加 token 到请求头
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做些什么
    return response.data; // 直接返回响应数据，省略包装
  },
  (error) => {
    // 对响应错误做些什么
    if (error.response) {
      // 服务器返回的错误
      const status = error.response.status;
      switch (status) {
        case 401:
          // 未授权，可以跳转到登录页面
          console.error('未授权，请重新登录');
		  uni.redirectTo({
		  	url: '/pages/login/index',
		  });
          break;
        case 403:
          // 权限不足
          console.error('权限不足');
          break;
        case 404:
          // 未找到
          console.error('请求的资源不存在');
          break;
        default:
          console.error('服务器错误');
      }
    } else if (error.request) {
      // 请求已经发送但没有收到响应
      console.error('请求超时或网络错误');
    } else {
      // 其他错误
      console.error('请求错误:', error.message);
    }

    return Promise.reject(error);
  }
);

export default http;
