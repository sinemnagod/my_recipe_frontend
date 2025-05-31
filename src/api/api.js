import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = 'https://myrecipeapi-production.up.railway.app';

export const getRecipes = () => {
  return axios.get(`${API_BASE_URL}/api/recipes`);
};

