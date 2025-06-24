import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import carIcon from '../../assets/icons/carIcon.svg'
import star from '../../assets/icons/favoriteIcon.svg'
import togetherCarIcon from '../../assets/icons/togetherCarIcon.svg'
import trustbag from '../../assets/images/trustbag.png'
import { CartDrawer } from '../../common/components/CartDrawer'
import { PeakyBlinders } from '../../common/components/PeakyBlinders'
import { ScrollDealsProducts } from '../../common/components/ScrollDealsProducts'
import { Subscribe } from '../../common/components/Subscribe'
import { Button } from '../../common/ui/Button/Button'
import { productColors } from '../../constant/productColors'

import styles from './ProductPage.module.scss'

export const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem(`product_${id}`))
    if (storedProduct) {
      setProduct(storedProduct)
      setSelectedColor(
        productColors.find((color) => color.id === storedProduct.colors[0])
          ?.color || 'white',
      )
      const storedFavorites =
        JSON.parse(localStorage.getItem('favorites')) || []
      const isInFavorites = storedFavorites.some(
        (item) => item.id === storedProduct.id,
      )
      setIsFavorite(isInFavorites)
    } else {
      console.log('Товар не найден в localStorage')
    }
  }, [id])

  const increment = () => setQuantity((prev) => prev + 1)
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize,
      selectedColor,
      quantity,
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || []
    const updatedCart = [...existingCart, cartItem]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setIsCartOpen(true)
  }

  const handleAddToFavorites = () => {
    alert('добавлено в избранные')
    const favoriteItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize,
      selectedColor,
    }

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []

    if (isFavorite) {
      const updatedFavorites = storedFavorites.filter(
        (item) => item.id !== product.id,
      )
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      setIsFavorite(false)
    } else {
      storedFavorites.push(favoriteItem)
      localStorage.setItem('favorites', JSON.stringify(storedFavorites))
      setIsFavorite(true)
    }
  }

  if (!product) {
    return <div>Загружаем данные о товаре...</div>
  }

  return (
    <>
      <section className={styles.productPage}>
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        <div className={styles.productContainer}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
          <div className={styles.right_side}>
            <span className={styles.logo}>Fasco</span>
            <div className={styles.group}>
              <p>{product.name}</p>
              <button
                className={styles.like}
                onClick={handleAddToFavorites}
              >
                <img
                  src={star}
                  alt="star"
                />
              </button>
            </div>
            <span className={styles.price}>{product.price}</span>
            <span className={styles.size}>Size: {selectedSize}</span>
            <div className={styles.sizes}>
              {product.size.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <span className={styles.color}>Color: {selectedColor}</span>
            <div className={styles.colors}>
              {product.colors.map((colorId, index) => {
                const color = productColors.find((c) => c.id === colorId)?.color
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      background: color,
                      border:
                        selectedColor === color
                          ? '2px solid black'
                          : '1px solid #ccc',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      marginRight: '5px',
                      cursor: 'pointer',
                    }}
                  />
                )
              })}
            </div>

            <span className={styles.quant_title}>Quantity</span>
            <div className={styles.finish_container}>
              <div className={styles.quantitys}>
                <button onClick={decrement}>-</button>
                <span>{quantity}</span>
                <button onClick={increment}>+</button>
              </div>
              <Button
                className={styles.addToCart}
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </div>
            <div className={styles.deliver}>
              <img
                src={carIcon}
                alt="car"
              />
              <p>
                Estimated Delivery: <span>April 12–14</span>
              </p>
            </div>
            <div className={styles.also_deliver}>
              <img
                src={togetherCarIcon}
                alt="Icon"
              />
              <p>Free Shipping & Returns: On all orders over $75</p>
            </div>
            <div className={styles.guarantee}>
              <img
                src={trustbag}
                alt="trustbag"
              />
              <p>Guarantee safe & secure checkout</p>
            </div>
          </div>
        </div>
      </section>
      <PeakyBlinders />
      <ScrollDealsProducts />
      <Subscribe />
    </>
  )
}
