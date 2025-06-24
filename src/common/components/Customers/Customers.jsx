import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import React, { useRef } from 'react'

import arrowLeft from '../../../assets/icons/arrowLeft.svg'
import arrowRight from '../../../assets/icons/arrowRight.svg'
import star from '../../../assets/icons/starIcon.svg'

import styles from './Customers.module.scss'

import 'swiper/css'
import 'swiper/css'

const peoples = [
  {
    id: 1,
    name: 'James K.',
    role: 'Traveler',
    text: 'You won’t regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!',
    rating: 5,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarQlB_3dXugG-jjJU0DOTJoapKl8Y4P4nJA&s',
  },
  {
    id: 2,
    name: 'Sarah M.',
    role: 'Designer',
    text: 'This is the best investment I’ve ever made. The product quality is outstanding!',
    rating: 4,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3TwRZU4ZczSbVyficyG2NG_8ZmeI48XkQLA&s',
  },
  {
    id: 3,
    name: 'John W.',
    role: 'Developer',
    text: 'Exactly what I was looking for. Thank you for making it painless, pleasant, and most of all, hassle-free!',
    rating: 5,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAMd6Lw49R3j54DpMvihhgkXAUV8X77zP4nQ&s',
  },
]

export const Customers = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  return (
    <section className={styles.container}>
      <h1 className={styles.say}>What Our Customers Say</h1>
      <p className={styles.title}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis
      </p>
      <div className={styles.sliderContainer}>
        <Swiper
          effect={'coverflow'}
          initialSlide={1}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          loop={false}
          coverflowEffect={{
            scale: 0.8,
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 0,
            slideShadows: true,
          }}
          pagination={false}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          modules={[EffectCoverflow, Navigation]}
          className={styles.swiper}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
              swiper.navigation.init()
              swiper.navigation.update()
            })
          }}
        >
          {peoples.map((item, index) => (
            <SwiperSlide
              key={index}
              className={styles.slide}
            >
              <div className={styles.testimonialCard}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />
                <div className={styles.right_side}>
                  <p className={styles.review}>&quot;{item.text}&quot;</p>
                  <div className={styles.rating}>
                    {[...Array(item.rating)].map((_, index) => (
                      <img
                        key={index}
                        src={star}
                        alt="star"
                        className={styles.star}
                      />
                    ))}
                  </div>
                  <hr />
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.role}>{item.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.buttons}>
          <button
            ref={prevRef}
            className={styles.customButton}
          >
            <img
              src={arrowLeft}
              alt="arrow-left"
            />
          </button>
          <button
            ref={nextRef}
            className={styles.customButton}
          >
            <img
              src={arrowRight}
              alt="arrow-right"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
