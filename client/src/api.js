import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  } else {
      delete config.headers.Authorization;
  }
  return config;
});

export default api;