/* eslint-disable no-constant-binary-expression */
import { useNavigate } from 'react-router-dom'

import HeroImgBottom from '../../../assets/images/hero-image-girls-two.png'
import HeroImgTop from '../../../assets/images/hero-image-girls.png'
import HeroImgLeft from '../../../assets/images/hero-one.png'
import HeroImgRight from '../../../assets/images/hero-two.png'
import { ROUTER_PATHS } from '../../../routes/routePaths'
import { Button } from '../../ui/Button/Button'

import styles from './Hero.module.scss'

export const Hero = () => {
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem('user' || '[]'))

  const handleCLick = () => {
    if (users) {
      navigate(ROUTER_PATHS.shop)
    } else {
      navigate(ROUTER_PATHS.signUp)
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.hero_left}>
        <img
          src={HeroImgLeft}
          alt="hero-left"
        />
      </div>
      <div className={styles.hero_center}>
        <img
          src={HeroImgTop}
          alt="hero-top"
        />
        <div className={styles.hero_center_content}>
          <h1 className={styles.hero_ultimate}>ULTIMATE</h1>
          <h1 className={styles.hero_sale}>SALE</h1>
          <p>NEW COLLECTION</p>
          <Button onClick={handleCLick}>SHOP NOW</Button>
        </div>
        <img
          src={HeroImgBottom}
          alt="hero-bottom"
        />
      </div>
      <div className={styles.hero_right}>
        <img
          src={HeroImgRight}
          alt="hero-right"
        />
      </div>
    </section>
  )
}
