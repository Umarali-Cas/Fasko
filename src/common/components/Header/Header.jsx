/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import logo from '../../../assets/icons/Logo.svg'
import favoriteIcon from '../../../assets/icons/favoriteIcon.svg'
import profileIcon from '../../../assets/icons/profileIcon.svg'
import shopIcon from '../../../assets/icons/shopIcon.svg'
import { ROUTER_PATHS } from '../../../routes/routePaths'
import { Button } from '../../ui/Button/Button'
import { NavBar } from '../../ui/NavBar'

import styles from './Header.module.scss'

const icons = [
  {
    src: profileIcon,
    path: ROUTER_PATHS.profile,
  },
  {
    src: favoriteIcon,
    path: ROUTER_PATHS.favorites,
  },
  {
    src: shopIcon,
    path: ROUTER_PATHS.cart,
  },
]

const homeItems = [
  { name: 'Home', path: '/' },
  { name: 'Deals', path: '/deals' },
  { name: 'New Arrivals', path: '/arrivals' },
  { name: 'Packages', path: '/packages' },
]

export const Header = () => {
  const [user, setUser] = useState(null)
  const nav = useNavigate()
  const location = useLocation()

  const isValidPath = homeItems.some((item) => item.path === location.pathname)

  useEffect(() => {
    const checkUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (storedUser) {
        setUser(storedUser)
      }
    }

    checkUser()
  }, [])

  return (
    <header>
      <img
        src={logo}
        alt="logo"
      />
      <div className={styles.container}>
        <div className={`${!isValidPath ? styles.navbar : styles.navbarMain}`}>
          <NavBar />
        </div>
        <div className={styles.buttons}>
          {user ? (
            <div className={styles.user_container}>
              {icons.map((icon, index) => (
                <img
                  key={index}
                  src={icon.src}
                  alt={`icon-${index}`}
                  onClick={() => nav(icon.path)}
                />
              ))}
            </div>
          ) : (
            <>
              <a
                className={styles.sign_in}
                href={ROUTER_PATHS.signIn}
              >
                Sign In
              </a>
              <Button
                className={styles.header_btn}
                onClick={() => nav(ROUTER_PATHS.signUp)}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
