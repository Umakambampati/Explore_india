import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
})

console.log("API BASE URL:", api.defaults.baseURL);

export default api