import { BrandLines } from '../../common/components/BrandsLine/BrandsLine'
import { Customers } from '../../common/components/Customers'
import { FollowUs } from '../../common/components/FollowUs/FollowUs'
import { Hero } from '../../common/components/Hero'
import { NewArrivals } from '../../common/components/NewArrivals/NewArrivals'
import { PeakyBlinders } from '../../common/components/PeakyBlinders'
import { ScrollDealsProducts } from '../../common/components/ScrollDealsProducts'
import { Subscribe } from '../../common/components/Subscribe'

import styles from './Main.module.scss'

export const Main = () => {
  return (
    <main className={styles.main}>
      <Hero />
      <BrandLines />
      <ScrollDealsProducts />
      <NewArrivals />
      <PeakyBlinders />
      <FollowUs />
      <Customers />
      <Subscribe />
    </main>
  )
}
