import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiShield, FiCheckCircle, FiMapPin } from 'react-icons/fi'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import Title from '../components/Title'
import { formatPrice } from '../config'
import './Home.css'

const perks = [
  [FiCheckCircle, 'Tested before sale', 'Every used phone is checked for battery, screen and network.'],
  [FiShield, 'Honest prices', 'The price you see here is the price in the shop.'],
  [FiMapPin, 'Visit in person', 'Hold the phone, compare, then decide.'],
]

export default function Home() {
  const { products, loading, error, reload } = useShop()
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const inStock = products.filter((p) => p.stock > 0)
  const featured = inStock.slice(0, 4)
  const hero = inStock[0]
  const brands = [...new Set(products.map((p) => p.brand))]

  const search = (e) => { e.preventDefault(); navigate(`/products?q=${encodeURIComponent(q)}`) }

  return (
    <>
      <section className="container hero">
        <div>
          <h1 className="hero__title">Find your next phone, at a price you can see.</h1>
          <p className="hero__text">
            Every phone on this site is in the shop right now. Check the price, then visit or message us to buy.
          </p>
          <form onSubmit={search} className="hero__search">
            <label className="hero__field">
              <span className="sr-only">Search phones</span>
              <FiSearch className="hero__icon" />
              <input className="hero__input" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Try “iPhone” or “Redmi”" />
            </label>
            <button className="btn">Search</button>
          </form>
        </div>

        <div className="hero__visual">
          {hero ? (
            <Link to={`/products/${hero._id}`} className="hero__tag">
              <p className="hero__tag-brand">{hero.brand} · {hero.condition === 'new' ? 'New' : 'Used'}</p>
              <p className="hero__tag-model">{hero.model}</p>
              <p className="hero__tag-price">{formatPrice(hero.price)}</p>
              <p className="hero__tag-meta">{hero.specs.ram} RAM · {hero.specs.storage} · {hero.stock} in stock</p>
            </Link>
          ) : (
            <div className="hero__skeleton" aria-hidden="true" />
          )}
        </div>
      </section>

      <section className="container">
        <Title sub="Available in the shop today"
          action={<Link to="/products" className="home__seeall">See all phones</Link>}>
          Latest in stock
        </Title>
        {loading && <p className="muted">Loading phones…</p>}
        {error && <p className="error-text">{error} <button className="link-btn" onClick={reload}>Try again</button></p>}
        <div className="products-grid">
          {featured.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      {brands.length > 0 && (
        <section className="container home__section">
          <Title>Shop by brand</Title>
          <div className="home__brands">
            {brands.map((b) => (
              <Link key={b} to={`/products?brand=${encodeURIComponent(b)}`} className="home__brand">{b}</Link>
            ))}
          </div>
        </section>
      )}

      <section className="container home__section home__perks">
        {perks.map(([Icon, t, d]) => (
          <div key={t} className="home__perk">
            <Icon size={26} className="home__perk-icon" />
            <div><h3>{t}</h3><p className="muted">{d}</p></div>
          </div>
        ))}
      </section>
    </>
  )
}