import { useEffect, useState } from 'react'

import { BreadCrumbs } from '../../common/components/BreadCrumbs'
import { Button } from '../../common/ui/Button/Button'

import styles from './Cart.module.scss'

export const Cart = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(storedCart)
  }, [])

  const updateQuantity = (index, change) => {
    const updated = [...cart]
    updated[index].quantity += change
    if (updated[index].quantity < 1) updated[index].quantity = 1
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const removeItem = (index) => {
    const updated = [...cart]
    updated.splice(index, 1)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price.replace('$', '')) * item.quantity,
    0,
  )

  return (
    <>
      <section className={styles.cart}>
        <h1 className={styles.pageName}>Shopping Cart</h1>
        <BreadCrumbs
          crumbs={[
            { name: 'Главная', path: '/' },
            { name: 'Корзина', path: '/cart' },
          ]}
        />
        <div className={styles.tovar_container}>
          <div className={styles.titles}>
            <h3>Product</h3>
            <h3>Price</h3>
            <h3>Quantity</h3>
            <h3>Total</h3>
          </div>
          <hr />

          {cart.map((item, index) => (
            <div
              key={index}
              className={styles.item}
            >
              <div className={styles.product}>
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className={styles.product_content}>
                <h3>{item.name}</h3>
                <p className={styles.color}>Color: {item.selectedColor}</p>
                <button
                  className={styles.remove}
                  onClick={() => removeItem(index)}
                >
                  🗑 Remove
                </button>
              </div>
              <p className={styles.currentPrice}>
                $
                {(Number(item.price.replace('$', '')) * item.quantity).toFixed(
                  2,
                )}
              </p>
              <div className={styles.quantity}>
                <button onClick={() => updateQuantity(index, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(index, 1)}>+</button>
              </div>
              <p className={styles.price}>{item.price}</p>
            </div>
          ))}

          <hr />
          <div className={styles.complate}>
            <div className={styles.final}>
              <input type="checkbox" />
              <p>
                For <span>$10.00</span> please wrap the product
              </p>
            </div>
            <div className={styles.subtotals}>
              <h3>Subtotal</h3>
              <h3 className={styles.subtotals}>${subtotal.toFixed(2)}</h3>
            </div>
            <Button>Checkout</Button>
          </div>
        </div>
      </section>
    </>
  )
}
