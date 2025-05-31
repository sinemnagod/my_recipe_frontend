const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const WS_URL = API_URL.replace('http', 'ws');

export const config = {
  API_URL,
  WS_URL,
  withCredentials: true
};

export default config; 