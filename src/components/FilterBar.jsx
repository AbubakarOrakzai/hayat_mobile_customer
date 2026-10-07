import { FiSearch } from 'react-icons/fi'
import './FilterBar.css'

export default function FilterBar({ filters, setFilters, brands }) {
  const set = (k) => (e) => setFilters({ ...filters, [k]: e.target.value })
  return (
    <div className="filters">
      <label className="filters__search">
        <span className="sr-only">Search phones</span>
        <FiSearch className="filters__icon" />
        <input className="filters__input filters__input--search" placeholder="Search by brand or model"
          value={filters.q} onChange={set('q')} />
      </label>

      <select className="filters__input" value={filters.brand} onChange={set('brand')} aria-label="Brand">
        <option value="">All brands</option>
        {brands.map((b) => <option key={b}>{b}</option>)}
      </select>

      <select className="filters__input" value={filters.condition} onChange={set('condition')} aria-label="Condition">
        <option value="">New and used</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>

      <select className="filters__input" value={filters.sort} onChange={set('sort')} aria-label="Sort">
        <option value="">Sort: default</option>
        <option value="low">Price: low to high</option>
        <option value="high">Price: high to low</option>
      </select>

      <label className="filters__check">
        <input type="checkbox" checked={filters.inStock}
          onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })} />
        Show only phones in stock
      </label>
    </div>
  )
}