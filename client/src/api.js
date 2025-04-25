import axios from 'axios';

const token = localStorage.getItem('adminToken');

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
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