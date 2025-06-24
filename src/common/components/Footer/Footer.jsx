import { NavLink } from 'react-router-dom'

import logo from '../../../assets/icons/logo.svg'

import styles from './Footer.module.scss'

const footerItems = [
  'Support Center',
  'Invoicing',
  'Contract',
  'Careers',
  'Blog',
  'FAQ,s',
]

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <img
            src={logo}
            alt="logo"
          />
          <div className={styles.items}>
            {footerItems.map((item, index) => (
              <NavLink
                key={index}
                to={'#'}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
              >
                {item}
              </NavLink>
            ))}
          </div>
        </div>
        <p>Copyright © 2022 Xpro . All Rights Reseved.</p>
      </div>
    </footer>
  )
}
