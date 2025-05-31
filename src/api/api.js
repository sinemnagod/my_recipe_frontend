import axios from 'axios';
import config from '../config';

console.log('API URL being used:', config.API_URL);

// Configure axios defaults
axios.defaults.withCredentials = config.withCredentials;

// Create axios instance with default config
const api = axios.create({
  baseURL: config.API_URL,
  withCredentials: config.withCredentials,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getRecipes = () => {
  return api.get('/api/recipes');
};

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

