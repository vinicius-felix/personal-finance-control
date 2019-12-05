import axios from 'axios';

const apiSpends = axios.create({
  baseURL: 'http://localhost:3001/spends',
});

export default apiSpends;