import { useState, useCallback } from 'react';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { errorTracker } from '../services/errorTracking';

interface APIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAPIResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (config?: Partial<AxiosRequestConfig>) => Promise<void>;
  reset: () => void;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for common error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export function useAPI<T = unknown>(
  initialConfig: AxiosRequestConfig,
  componentName?: string
): UseAPIResponse<T> {
  const [state, setState] = useState<APIState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const execute = useCallback(
    async (config: Partial<AxiosRequestConfig> = {}) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      
      try {
        const mergedConfig: AxiosRequestConfig = {
          ...initialConfig,
          ...config,
        };
        
        const response: AxiosResponse<T> = await api(mergedConfig);
        setState({ data: response.data, loading: false, error: null });
        
        return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.data?.message || axiosError.message;
        
        errorTracker.handleAPIError(axiosError, componentName);
        setState((prev) => ({
          ...prev,
          data: null,
          loading: false,
          error: errorMessage,
        }));
        
        throw error;
      }
    },
    [initialConfig, componentName]
  );

  return {
    ...state,
    execute,
    reset,
  };
}

export default api;
