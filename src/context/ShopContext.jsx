import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getProducts } from '../services/productService'

const ShopContext = createContext(null)
export const useShop = () => useContext(ShopContext)

export default function ShopProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try { setProducts(await getProducts()) }
    catch { setError('Could not load products. Check your connection and try again.') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <ShopContext.Provider value={{ products, loading, error, reload: load }}>
      {children}
    </ShopContext.Provider>
  )
}