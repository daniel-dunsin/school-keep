import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { authService } from '../services/auth.service';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const https = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    is_web: true,
  },
});

https.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        toast.error('Sesion expired, login again');
        await authService.logOut();
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);
