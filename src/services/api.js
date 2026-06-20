import axios from 'axios';

const API = axios.create({
  baseURL: 'https://6a02c6300d92f63dd2540968.mockapi.io',
});

export default API;