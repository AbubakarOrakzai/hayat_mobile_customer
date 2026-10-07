import { api, USE_MOCK, delay } from './api'
import { mockProducts } from '../mock/data'

export async function getProducts() {
  if (USE_MOCK) { await delay(); return mockProducts }
  const { data } = await api.get('/products')
  return data
}

export async function getProduct(id) {
  if (USE_MOCK) { await delay(200); return mockProducts.find((p) => p._id === id) || null }
  const { data } = await api.get(`/products/${id}`)
  return data
}