import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX, FiSmartphone } from 'react-icons/fi'
import { SHOP } from '../config'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Phones' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__logo">
          <span className="nav__logo-icon"><FiSmartphone /></span>
          {SHOP.name}
        </Link>

        <nav className="nav__links" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className="nav__link">{l.label}</NavLink>
          ))}
        </nav>

        <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="container nav__mobile" aria-label="Mobile">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className="nav__link" onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}