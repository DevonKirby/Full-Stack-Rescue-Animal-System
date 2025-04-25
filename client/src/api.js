import axios from 'axios';

const token = localStorage.getItem('adminToken');

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
  headers: {
    Authorization: token ? `Bearer ${token}`: ''
  }
});

export default api;