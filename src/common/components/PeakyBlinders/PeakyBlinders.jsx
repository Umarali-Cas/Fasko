import features from '../../../assets/icons/features.svg'
import peakly from '../../../assets/images/peakly.png'
import { Button } from '../../ui/Button/Button'

import styles from './PeakyBlinders.module.scss'

export const PeakyBlinders = () => {
  return (
    <section className={styles.section_container}>
      <div className={styles.container}>
        <div className={styles.left_side}>
          <img
            src={peakly}
            alt={peakly}
          />
        </div>
        <div className={styles.right_side}>
          <p>Women Collection</p>
          <h1>Peaky Blinders</h1>
          <a href="/desc">DESCRIPTION</a>
          <p className={styles.txt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Scelerisque duis.
          </p>
          <div className={styles.size_container}>
            <span className={styles.size_text}>Size:</span>
            <div className={styles.size_content}>
              <span>M</span>
            </div>
          </div>
          <h3>$100.00</h3>
          <Button className={styles.btn}>Buy Now</Button>
        </div>
      </div>
      <img
        src={features}
        alt="features-image"
        className={styles.features}
      />
    </section>
  )
}
