import axios from 'axios';
import { API_ENDPOINT } from './config';

const authService = {
  setAuthHeader: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_ENDPOINT}/api/Auth/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      authService.setAuthHeader(response.data.token);
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
      const response = await axios.get(`${API_ENDPOINT}/api/Users/me`);
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await axios.put(`${API_ENDPOINT}/api/Users/${userData.userId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    authService.setAuthHeader(null);
  },
};

export default authService;
