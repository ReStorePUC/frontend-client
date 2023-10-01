import axios from 'axios';

// keep in url for now
let api = axios.create({
  baseURL: 'http://localhost:8000',
});

export default api;
