import axios from 'axios';
import { ACCESS_KEY, BASE_URL } from '../constants';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});
