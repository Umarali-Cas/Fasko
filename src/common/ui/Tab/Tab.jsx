import { Button } from '../Button/Button'

import styles from './Tab.module.scss'

export const Tab = ({ children, className, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`${styles.tab} ${className}`}
    >
      {children}
    </Button>
  )
}
