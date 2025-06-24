import women from '../../../assets/images/sub-three.png'
import men from '../../../assets/images/sub-two.png'
import { Button } from '../../ui/Button/Button'

import styles from './Subscribe.module.scss'

export const Subscribe = () => {
  return (
    <section className={styles.container}>
      <img
        src={men}
        alt="img-sub"
      />
      <div className={styles.content}>
        <h1>Subscribe To Our Newsletter</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
          sollicitudin{' '}
        </p>
        <input
          type="email"
          id="1"
          placeholder="michael@ymail.com"
        />
        <Button className={styles.btn}>Subscribe Now</Button>
      </div>
      <img
        src={women}
        alt="img-sub"
      />
    </section>
  )
}
