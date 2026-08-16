import axios from 'axios'
import { getAccessToken } from '../utils/storage'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || 'Request failed. Please try again.'
    return Promise.reject(new Error(message))
  },
)

export default apiClient
