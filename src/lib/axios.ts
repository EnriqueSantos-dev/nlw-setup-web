import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.SERVER_HOST,
});

export { api };
