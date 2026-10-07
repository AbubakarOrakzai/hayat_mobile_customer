import { api, USE_MOCK, delay } from './api'

export async function sendMessage(form) {
  if (USE_MOCK) {
    await delay(600)
    const saved = JSON.parse(localStorage.getItem('messages') || '[]')
    localStorage.setItem('messages', JSON.stringify([...saved, { ...form, date: new Date().toISOString() }]))
    return { ok: true }
  }
  const { data } = await api.post('/contact', form)
  return data
}