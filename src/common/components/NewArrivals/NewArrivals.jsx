import { useLocale } from 'antd/es/locale'

import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchProducts } from '../../../api/redux/productsSlice'
import { ROUTER_PATHS } from '../../../routes/routePaths'
import { Button } from '../../ui/Button/Button'
import { ProductCard } from '../../ui/Products/ArrivalProductCard'
import { Tab } from '../../ui/Tab'

import styles from './NewArrivals.module.scss'

export const productCategories = [
  { id: 1, name: 'Men’s Fashion' },
  { id: 2, name: 'Women’s Fashion' },
  { id: 3, name: 'Women Accessories' },
  { id: 4, name: 'Men Accessories' },
  { id: 5, name: 'Discount Deals' },
]

export const ArrivalProducts = () => {
  const location = useLocale()
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.products)

  // Состояние активной категории
  const [activeCategory, setActiveCategory] = useState(2) // По умолчанию Women’s Fashion

  const [isMore, setIsMore] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts(activeCategory))
  }, [dispatch, activeCategory])
  // Фильтрация товаров по выбранной категории
  const filteredProducts = items.filter(
    (product) => product.category === activeCategory,
  )

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>
  }
  if (status === 'failed') return <p>Error loading products.</p>

  return (
    <>
      {/* Табуляция категорий */}
      <div className={styles.tabs}>
        {productCategories.map((category) => (
          <Tab
            key={category.id}
            className={category.id === activeCategory ? styles.active : ''}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Tab>
        ))}
      </div>

      <div className={styles.tovars}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>

      <Button onClick={() => setIsMore((prev) => !prev)}>View More</Button>
    </>
  )
}

export const NewArrivals = () => {
  return (
    <section className={styles.container}>
      <h2>New Arrivals</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
        sollicitudin
      </p>
      <ArrivalProducts />
    </section>
  )
}
