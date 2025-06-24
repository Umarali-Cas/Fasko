import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './CoverflowSlider.module.scss'

import 'swiper/css'

export const CoverflowSlider = ({ tovarImg }) => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2}
      loop={false}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      modules={[EffectCoverflow, Pagination]}
      className={styles.swiper}
    >
      {tovarImg.map((src, index) => (
        <SwiperSlide
          key={index}
          className={styles.slide}
        >
          <div className={styles.imageContainer}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className={styles.image}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
