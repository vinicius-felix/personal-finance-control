import axios from 'axios';

const apiCategories = axios.create({
  baseURL: 'http://localhost:3001/categories',
});

export default apiCategories;