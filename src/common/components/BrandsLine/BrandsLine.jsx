import celvinClein from '../../../assets/icons/celvinClein.svg'
import chanel from '../../../assets/icons/chanel.svg'
import denim from '../../../assets/icons/denim.svg'
import louisViton from '../../../assets/icons/louisViton.svg'
import prada from '../../../assets/icons/prada.svg'

import style from './BrandsLine.module.scss'

const brands = [chanel, louisViton, prada, celvinClein, denim]

export const BrandLines = () => {
  return (
    <section className={style.brands_line}>
      {brands.map((item, index) => (
        <img
          src={item}
          alt={item}
          key={index}
        />
      ))}
    </section>
  )
}
