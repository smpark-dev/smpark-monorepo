import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';

export const storeApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SMPARK_RESOURCE_BASE_URI,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

storeApiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.set('Authorization', `Bearer ${session.accessToken}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

storeApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      const session = await getSession();

      if (!session) {
        signIn('smpark');
        throw new Error('Session not found');
      }

      originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
      return storeApiClient(originalRequest);
    }

    return Promise.reject(error);
  },
);
