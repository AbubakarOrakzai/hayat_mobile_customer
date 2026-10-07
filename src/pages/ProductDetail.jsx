import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiSmartphone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { getProduct } from '../services/productService'
import { SHOP, formatPrice } from '../config'
import './Productdetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const [p, setP] = useState(undefined) // undefined = loading, null = not found

  useEffect(() => {
    setP(undefined)
    getProduct(id).then(setP).catch(() => setP(null))
  }, [id])

  if (p === undefined) return <p className="container page muted">Loading…</p>
  if (p === null) return (
    <div className="container notfound">
      <p className="detail__notfound-title">We couldn’t find that phone.</p>
      <Link to="/products" className="link-btn">Back to all phones</Link>
    </div>
  )

  const soldOut = p.stock === 0
  const msg = encodeURIComponent(`Hello, I am interested in the ${p.brand} ${p.model} (${p.specs.storage}). Is it available?`)

  return (
    <div className="container page">
      <Link to="/products" className="detail__back"><FiArrowLeft /> All phones</Link>

      <div className="detail">
        <div className="detail__media">
          {p.image ? <img src={p.image} alt={`${p.brand} ${p.model}`} className="detail__img" />
            : <FiSmartphone size={96} className="detail__placeholder" />}
        </div>

        <div>
          <p className="muted">{p.brand} · {p.condition === 'new' ? 'New' : 'Used'}</p>
          <h1 className="detail__model">{p.model}</h1>

          <p className={soldOut ? 'detail__price detail__price--soldout' : 'detail__price'}>
            {soldOut ? 'Sold out' : formatPrice(p.price)}
          </p>
          {!soldOut && (
            <p className={p.stock <= 2 ? 'detail__stock detail__stock--low' : 'detail__stock'}>
              {p.stock <= 2 ? `Only ${p.stock} left in the shop` : `${p.stock} available in the shop`}
            </p>
          )}

          <p className="detail__desc">{p.description}</p>

          <dl className="detail__specs">
            {[['RAM', p.specs.ram], ['Storage', p.specs.storage], ['Colour', p.specs.color]].map(([k, v]) => (
              <div key={k}><dt className="muted">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>

          <a href={`https://wa.me/${SHOP.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer"
            className="btn btn--green detail__cta">
            <FaWhatsapp size={20} /> {soldOut ? 'Ask when it’s back' : 'Ask about this phone'}
          </a>
          <p className="detail__visit muted">Or visit us: {SHOP.address}</p>
        </div>
      </div>
    </div>
  )
}