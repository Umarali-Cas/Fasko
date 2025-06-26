import img1 from '../../../assets/images/scroll-image-one.png'
import img3 from '../../../assets/images/scroll-image-three.png'
import img2 from '../../../assets/images/scroll-image-two.png'
import { Button } from '../../ui/Button/Button'
import { CountdownTimer } from '../../ui/CountdownTimer/CountdownTimer'
import { CoverflowSlider } from '../../ui/CoverflowSlider'

import styles from './ScrollDealsProducts.module.scss'

const images = [img2, img1, img3]

const days = ['02', '06', '05', '30']
const times = ['Days', 'Hr', 'Mins', 'Sec']

export const ScrollDealsProducts = () => {
  return (
    <section className={styles.container}>
      <div className={styles.left_side}>
        <h2>Deals Of The Month</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
          sollicitudin
        </p>
        <Button className={styles.btn}>Buy Now</Button>
        <div className={styles.timer_container}>
          <h3>Hurry, Before It’s Too Late!</h3>
          <div className={styles.timers}>
            <CountdownTimer />
          </div>
        </div>
      </div>
      <div className={styles.right_side}>
        <CoverflowSlider tovarImg={images} />
      </div>
    </section>
  )
}
