import axios from 'axios'
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })
export const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))