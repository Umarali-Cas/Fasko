/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'

import { productColors } from '../../../constant/productColors'

import styles from './Filters.module.scss'

export const Filters = ({ onApply }) => {
  const [filters, setFilters] = useState({ size: '', color: '' })

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    console.log('Выбранный цвет:', filters.color)
    onApply(filters)
  }, [filters, onApply])

  return (
    <div>
      <div className={styles.filters}>
        <h3>Filters</h3>
        <div>
          <label>Size:</label>
          <select onChange={(e) => handleFilterChange('size', e.target.value)}>
            <option value="">All</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>
        <div>
          <label>Color:</label>
          <select onChange={(e) => handleFilterChange('color', e.target.value)}>
            <option value="">All</option>
            {productColors.map((color) => (
              <option
                key={color.id}
                value={color.color}
              >
                {color.color}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
