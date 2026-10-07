import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import FilterBar from '../components/FilterBar'
import ProductCard from '../components/ProductCard'
import Title from '../components/Title'
import './Product.css'

const EMPTY = { q: '', brand: '', condition: '', sort: '', inStock: false }

export default function Products() {
  const { products, loading, error, reload } = useShop()
  const [params] = useSearchParams()
  const [filters, setFilters] = useState({
    ...EMPTY,
    q: params.get('q') || '',
    brand: params.get('brand') || '',
  })

  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [products])

  const list = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    let out = products.filter((p) =>
      (!q || `${p.brand} ${p.model}`.toLowerCase().includes(q)) &&
      (!filters.brand || p.brand === filters.brand) &&
      (!filters.condition || p.condition === filters.condition) &&
      (!filters.inStock || p.stock > 0)
    )
    if (filters.sort === 'low') out = [...out].sort((a, b) => a.price - b.price)
    if (filters.sort === 'high') out = [...out].sort((a, b) => b.price - a.price)
    return out
  }, [products, filters])

  return (
    <div className="container page">
      <Title sub={loading ? '' : `${list.length} phone${list.length === 1 ? '' : 's'} found`}>All phones</Title>
      <FilterBar filters={filters} setFilters={setFilters} brands={brands} />

      {loading && <p className="muted">Loading phones…</p>}
      {error && <p className="error-text">{error} <button className="link-btn" onClick={reload}>Try again</button></p>}

      {!loading && !error && list.length === 0 && (
        <div className="products__empty">
          <p className="products__empty-title">No phones match these filters.</p>
          <button className="link-btn" onClick={() => setFilters(EMPTY)}>Clear filters</button>
        </div>
      )}

      <div className="products-grid">
        {list.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  )
}