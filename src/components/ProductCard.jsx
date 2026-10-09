import { Link } from 'react-router-dom'
import { FiSmartphone } from 'react-icons/fi'
import { formatPrice } from '../config'
import './Productcard.css'

// Ask Cloudinary for a square, card-sized copy of the photo. g_auto picks the crop that
// keeps the phone in view, so tall and wide photos both fit the card. Other links are used as they are.
const cardImage = (url) =>
  url.includes('res.cloudinary.com') ? url.replace('/upload/', '/upload/c_fill,g_auto,ar_1:1,w_600/') : url

export default function ProductCard({ product: p }) {
  const soldOut = p.stock === 0
  return (
    <Link to={`/products/${p._id}`} className="card">
      <div className="card__media">
        {p.image
          ? <img src={cardImage(p.image)} alt={`${p.brand} ${p.model}`} loading="lazy" className={soldOut ? 'card__img card__img--soldout' : 'card__img'} />
          : <FiSmartphone size={56} className="card__placeholder" />}
        <span className="card__badge">{p.condition === 'new' ? 'New' : 'Used'}</span>
        <span className={soldOut ? 'card__tag card__tag--soldout' : 'card__tag'}>
          {soldOut ? 'Sold out' : formatPrice(p.price)}
        </span>
      </div>
      <div className="card__body">
        <p className="card__brand muted">{p.brand}</p>
        <h3 className="card__model" title={p.model}>{p.model}</h3>
        <p className="card__spec">{p.specs.ram} RAM · {p.specs.storage}</p>
        {/* always one stock line, so sold out cards are the same height as the rest */}
        {soldOut
          ? <p className="card__stock card__stock--out">Out of stock</p>
          : (
            <p className={p.stock <= 2 ? 'card__stock card__stock--low' : 'card__stock'}>
              {p.stock <= 2 ? `Only ${p.stock} left` : `${p.stock} in stock`}
            </p>
          )}
      </div>
    </Link>
  )
}