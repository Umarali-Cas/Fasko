import { productColors } from '../../../constant/productColors'

import styles from './ProductCard.module.scss'

export const ProductCard = ({ image, name, price, colors, sizes }) => {
  const currentColor = productColors
    .filter((colorObj) => colors.includes(colorObj.id))
    .map((colorObj) => colorObj.color)
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={name}
      />
      <h3>{name}</h3>
      <p>{price}</p>
      <div className={styles.information}>
        <div className={styles.colors}>
          {currentColor.map((color, index) => (
            <div
              key={index}
              className={styles.colorContainer}
            >
              <div
                className={styles.color}
                style={{ backgroundColor: color }}
              ></div>
            </div>
          ))}
        </div>
        <div className={styles.sizes}>
          {sizes.map((size, index) => (
            <div
              className={styles.sizeContainer}
              key={index}
            >
              <span
                key={index}
                className={styles.size}
              >
                {size}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
