import axios from 'axios';

const apiAuth = axios.create({
  baseURL: 'http://localhost:3001/auth',
});

export default apiAuth;