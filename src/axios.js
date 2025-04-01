// src/api/axios.js
import axios from 'axios';


const instance = axios.create({
  baseURL:'/api',
});

// 从本地存储获取 token
const getAuthToken = () => {
  return localStorage.getItem('token'); // 或其他存储方式
};

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = getAuthToken();
    console.log(token);
    console.log(config);
    if (token && config.url!='/auth/login') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log("filter",error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 403) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );


export default instance;