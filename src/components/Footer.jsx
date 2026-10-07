import { Link } from 'react-router-dom'
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi'
import { SHOP } from '../config'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__name">{SHOP.name}</p>
          <p className="footer__about">New and used phones, checked before they reach the shelf.</p>
        </div>
        <ul className="footer__list">
          <li><FiPhone />{SHOP.phone}</li>
          <li><FiMapPin />{SHOP.address}</li>
          <li><FiClock />{SHOP.hours}</li>
        </ul>
        <ul className="footer__list footer__links">
          <li><Link to="/products">Browse phones</Link></li>
          <li><Link to="/about">About the shop</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
        </ul>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} {SHOP.name}</p>
    </footer>
  )
}