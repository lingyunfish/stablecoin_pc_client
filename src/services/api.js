import axios from 'axios';

// 创建API客户端
const apiClient = axios.create({
  baseURL: 'http://9.134.2.89:10002', // 替换为实际API地址
});

// JWT拦截器
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;
