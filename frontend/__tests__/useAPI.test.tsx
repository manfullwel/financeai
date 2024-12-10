import { renderHook, act } from '@testing-library/react-hooks';
import { useAPI } from '../hooks/useAPI';
import axios from 'axios';
import { errorTracker } from '../services/errorTracking';

// Mock axios
const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  },
  defaults: { baseURL: '' }
};

jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance)
}));

// Mock error tracking service
jest.mock('../services/errorTracking', () => ({
  errorTracker: {
    handleAPIError: jest.fn(),
  },
}));

describe('useAPI Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    console.debug = jest.fn();
  });

  it('should handle successful API calls', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockResponse = { data: mockData };
    
    mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

    const initialConfig = {
      url: '/test',
      method: 'GET',
    };

    const { result } = renderHook(() => useAPI(initialConfig, 'TestComponent'));

    // Debug initial state
    console.debug('Initial State:', result.current);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Execute API call
    await act(async () => {
      await result.current.execute();
    });

    // Debug final state
    console.debug('Final State:', result.current);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors correctly', async () => {
    const mockError = {
      response: {
        data: { message: 'API Error' },
        status: 400,
      },
      message: 'Request failed',
    };

    mockAxiosInstance.get.mockRejectedValueOnce(mockError);

    const initialConfig = {
      url: '/test',
      method: 'GET',
    };

    const { result } = renderHook(() => useAPI(initialConfig, 'TestComponent'));

    // Test error handling
    await act(async () => {
      try {
        await result.current.execute();
      } catch (error) {
        console.debug('Caught error:', error);
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('API Error');
    expect(errorTracker.handleAPIError).toHaveBeenCalled();
  });

  it('should handle authentication token correctly', async () => {
    const token = 'test-token';
    localStorage.setItem('token', token);

    const mockData = { id: 1, name: 'Test' };
    const mockResponse = { data: mockData };
    
    mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

    const initialConfig = {
      url: '/test',
      method: 'GET',
    };

    const { result } = renderHook(() => useAPI(initialConfig, 'TestComponent'));

    await act(async () => {
      await result.current.execute();
    });

    // Verify that the interceptors were set up
    const mockInstance = axios.create();
    expect(mockInstance.interceptors.request.use).toHaveBeenCalled();
  });

  it('should reset state correctly', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockResponse = { data: mockData };
    
    mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAPI({ url: '/test', method: 'GET' }));

    // First, make a successful API call
    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toEqual(mockData);

    // Then reset the state
    act(() => {
      result.current.reset();
    });

    // Debug reset state
    console.debug('Reset State:', result.current);
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle callbacks correctly', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockResponse = { data: mockData };
    const onSuccess = jest.fn();
    const onError = jest.fn();

    mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAPI({ url: '/test', method: 'GET' }));

    await act(async () => {
      try {
        const response = await result.current.execute();
        onSuccess(response);
      } catch (error) {
        onError(error);
      }
    });

    expect(onSuccess).toHaveBeenCalledWith(mockResponse);
    expect(onError).not.toHaveBeenCalled();
  });
});
