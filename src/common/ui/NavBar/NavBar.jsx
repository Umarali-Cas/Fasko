import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import arrowIcon from '../../../assets/icons/arrowIcon.svg'

import styles from './NavBar.module.scss'

const homeItems = [
  { name: 'Home', path: '/' },
  { name: 'Deals', path: '/deals' },
  { name: 'New Arrivals', path: '/arrivals' },
  { name: 'Packages', path: '/packages' },
]

const anyItems = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Products', path: '/products' },
]

export function NavBar() {
  const location = useLocation()

  const isValidPath = homeItems.some((item) => item.path === location.pathname)

  const menuItems = isValidPath ? homeItems : anyItems

  const pages = ['About', 'Contact', 'Blog']
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      {menuItems.map((item) => (
        <NavLink
          key={item.name || item}
          to={item.path || '#'}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          {item.name || item}
        </NavLink>
      ))}
      {!isValidPath ? (
        <div
          className={styles.dropdown}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className={styles.dropdownToggle}>
            <span>Pages</span>
            <img
              src={arrowIcon}
              alt="icon"
            />
          </div>
          {isOpen && (
            <ul className={styles.dropdownMenu}>
              {pages.map((page) => (
                <li
                  key={page}
                  className={styles.dropdownItem}
                >
                  {page}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </nav>
  )
}
