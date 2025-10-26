import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

//  AUTH APIs
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
};

//  USER APIs  
export const users = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
};

//  BIOMETRIC APIs
export const biometrics = {
  create: (data) => api.post('/biometrics', data),
  getAll: (params) => api.get('/biometrics', { params }),
  getLatest: () => api.get('/biometrics/latest'),
  update: (id, data) => api.put(`/biometrics/${id}`, data),
  delete: (id) => api.delete(`/biometrics/${id}`),
};

// 🆕 NEW WEEK 2 APIs
export const recommendations = {
  getAll: (params) => api.get('/recommendations', { params }),
  generate: () => api.post('/recommendations/generate'),
  getStats: () => api.get('/recommendations/stats'),
  updateStatus: (id, data) => api.put(`/recommendations/${id}`, data),
  delete: (id) => api.delete(`/recommendations/${id}`),
};

export const workouts = {
  create: (data) => api.post('/workouts', data),
  getAll: (params) => api.get('/workouts', { params }),
  getById: (id) => api.get(`/workouts/${id}`),
  update: (id, data) => api.put(`/workouts/${id}`, data),
  complete: (id, data) => api.put(`/workouts/${id}/complete`, data),
  delete: (id) => api.delete(`/workouts/${id}`),
};

export const mealPlans = {
  create: (data) => api.post('/meal-plans', data),
  getAll: (params) => api.get('/meal-plans', { params }),
  getById: (id) => api.get(`/meal-plans/${id}`),
  update: (id, data) => api.put(`/meal-plans/${id}`, data),
  rate: (id, data) => api.put(`/meal-plans/${id}/rate`, data),
  delete: (id) => api.delete(`/meal-plans/${id}`),
};

export default api;
