import { useEffect, useState } from 'react'

import styles from './Favorites.module.scss'

export const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(storedFavorites)
  }, [])

  const removeFavorite = (index) => {
    const updated = [...favorites]
    updated.splice(index, 1)
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  return (
    <section className={styles.favorites}>
      <h1 className={styles.pageName}>Favorites</h1>
      <p className={styles.breadcrumbs}>{'Home > Your Favorites'}</p>
      <div className={styles.productContainer}>
        {favorites.length === 0 ? (
          <>
            <hr />
            <p className={styles.empty}> You haven't favorite product</p>
          </>
        ) : (
          <>
            <div className={styles.titles}>
              <h3>Product</h3>
              <h3>Price</h3>
              <h3>Actions</h3>
            </div>
            <hr />
            {favorites.map((item, index) => (
              <>
                <div
                  key={index}
                  className={styles.item}
                >
                  <div className={styles.product}>
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                    <div className={styles.productContent}>
                      <h3>{item.name}</h3>
                      <p className={styles.color}>
                        Color: {item.selectedColor}
                      </p>
                    </div>
                  </div>
                  <div className={styles.price_container}>
                    <p className={styles.price}>{item.price}</p>
                  </div>
                  <div className={styles.actions}>
                    <button
                      className={styles.remove}
                      onClick={() => removeFavorite(index)}
                    >
                      🗑 Remove from Favorites
                    </button>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
