import { Link } from 'react-router-dom'
import { FiSmartphone } from 'react-icons/fi'
import { formatPrice } from '../config'
import './Productcard.css'

export default function ProductCard({ product: p }) {
  const soldOut = p.stock === 0
  return (
    <Link to={`/products/${p._id}`} className="card">
      <div className="card__media">
        {p.image
          ? <img src={p.image} alt={`${p.brand} ${p.model}`} className={soldOut ? 'card__img card__img--soldout' : 'card__img'} />
          : <FiSmartphone size={56} className="card__placeholder" />}
        <span className="card__badge">{p.condition === 'new' ? 'New' : 'Used'}</span>
        <span className={soldOut ? 'card__tag card__tag--soldout' : 'card__tag'}>
          {soldOut ? 'Sold out' : formatPrice(p.price)}
        </span>
      </div>
      <div className="card__body">
        <p className="card__brand muted">{p.brand}</p>
        <h3 className="card__model">{p.model}</h3>
        <p className="card__spec">{p.specs.ram} RAM · {p.specs.storage}</p>
        {!soldOut && (
          <p className={p.stock <= 2 ? 'card__stock card__stock--low' : 'card__stock'}>
            {p.stock <= 2 ? `Only ${p.stock} left` : `${p.stock} in stock`}
          </p>
        )}
      </div>
    </Link>
  )
}