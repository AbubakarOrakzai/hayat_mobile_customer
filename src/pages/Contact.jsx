import { useState } from 'react'
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi'
import { sendMessage } from '../services/contactService'
import { SHOP } from '../config'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try { await sendMessage(form); setStatus('sent'); setForm({ name: '', phone: '', message: '' }) }
    catch { setStatus('error') }
  }

  return (
    <div className="container page contact">
      <div>
        <h1 className="contact__title">Contact us</h1>
        <p className="contact__lead muted">Ask about a phone, its price or a trade-in. We reply the same day.</p>
        <ul className="contact__info">
          <li><FiPhone />{SHOP.phone}</li>
          <li><FiMapPin />{SHOP.address}</li>
          <li><FiClock />{SHOP.hours}</li>
        </ul>
      </div>

      <form onSubmit={submit} className="contact__form">
        <label className="contact__label"><span>Your name</span>
          <input required className="field" value={form.name} onChange={set('name')} /></label>
        <label className="contact__label"><span>Phone number</span>
          <input required type="tel" className="field" value={form.phone} onChange={set('phone')} /></label>
        <label className="contact__label"><span>Message</span>
          <textarea required rows={5} className="field" value={form.message} onChange={set('message')} /></label>

        <button className="btn contact__submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'sent' && <p role="status" className="contact__ok">Message sent. We will call you back soon.</p>}
        {status === 'error' && <p role="alert" className="error-text contact__err">Message not sent. Check your connection and try again.</p>}
      </form>
    </div>
  )
}