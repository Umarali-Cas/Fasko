import star from '../../../assets/icons/star.svg'

import styles from './ArrivalProductCard.module.scss'

export const ProductCard = ({ img, tovarName, reviews, sold, price }) => {
  return (
    <div className={styles.product}>
      <img
        src={img}
        alt={tovarName}
        className={styles.image}
      />
      <div className={styles.product_top}>
        <span>{tovarName}</span>
        <img
          src={star}
          alt="star"
        />
      </div>
      <p>{`(${reviews}) Customer Reviews`}</p>
      <div className={styles.product_bottom}>
        <span className={styles.price}>{price}</span>
        <span className={styles.sold}>{sold}</span>
      </div>
    </div>
  )
}
