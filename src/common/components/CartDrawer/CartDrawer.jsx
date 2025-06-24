import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTER_PATHS } from '../../../routes/routePaths'

import styles from './CartDrawer.module.scss'

export const CartDrawer = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(storedCart)
  }, [isOpen])

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
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <h3>Shopping Cart</h3>
        <button onClick={onClose}>✕</button>
      </div>

      <p className={styles.freeShipping}>
        Buy <strong>${(150 - subtotal).toFixed(2)}</strong> More And Get{' '}
        <strong>Free Shipping</strong>
      </p>

      <div className={styles.items}>
        {cart.map((item, index) => (
          <div
            key={index}
            className={styles.item}
          >
            <img
              src={item.image}
              alt={item.name}
            />
            <div className={styles.info}>
              <p>{item.name}</p>
              <p>Color: {item.selectedColor}</p>
              <div className={styles.quantityControl}>
                <button onClick={() => updateQuantity(index, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(index, 1)}>+</button>
              </div>
              <p>
                $
                {(Number(item.price.replace('$', '')) * item.quantity).toFixed(
                  2,
                )}
              </p>
              <button
                className={styles.remove}
                onClick={() => removeItem(index)}
              >
                🗑 Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.subtotal}>
          <span>Subtotal</span>
          <div className={styles.line}></div>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button className={styles.checkout}>Checkout</button>
        <button
          className={styles.viewCart}
          onClick={() => nav(ROUTER_PATHS.cart)}
        >
          View Cart
        </button>
      </div>
    </div>
  )
}
