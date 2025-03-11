
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'http://3.91.248.159/app/'; // Replace with your API base URL

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Retrieve token from local storage
      const tokenJson = await AsyncStorage.getItem('token'); // Replace with secure storage if needed
      
      let token=JSON.parse(tokenJson)
      console.log({token});
      // Ensure headers object exists and is properly typed
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
      }

      // Set the Authorization header dynamically
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }

      // Return the modified config
      return config;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle response error
    console.log({errorrrr:error?.response?.data});
    
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized, logging out...');
        // Add your logout logic here
      }
    }
    return Promise.reject(error?.response?.data);
  }
);

export default axiosInstance;
