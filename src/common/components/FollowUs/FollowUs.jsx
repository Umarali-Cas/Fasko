import follow5 from '../../../assets/images/follow-five.png'
import follow1 from '../../../assets/images/follow-one.png'
import follow6 from '../../../assets/images/follow-six.png'
import follow3 from '../../../assets/images/follow-three.png'
import follow2 from '../../../assets/images/follow-two.png'

import styles from './FollowUs.module.scss'

const images = [follow1, follow3, follow6, follow5, follow2]
export const FollowUs = () => {
  return (
    <section className={styles.container}>
      <h1>Follow Us On Instagram</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
        sollicitudin
      </p>
      <div className={styles.image_slider}>
        {images.map((item, index) => (
          <img
            src={item}
            alt="image-carousel"
            key={index}
            className={styles.image}
          />
        ))}
      </div>
    </section>
  )
}
