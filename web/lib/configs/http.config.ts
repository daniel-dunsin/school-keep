import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const https = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    is_web: true,
  },
});
