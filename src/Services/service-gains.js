import axios from 'axios';

const apiGains = axios.create({
  baseURL: 'http://localhost:3001/gains',
});

export default apiGains;