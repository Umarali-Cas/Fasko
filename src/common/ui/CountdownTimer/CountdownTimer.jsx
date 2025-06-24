/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import styles from './CountdownTimer.module.scss'

export const CountdownTimer = () => {
  const times = ['Days', 'Hr', 'Mins', 'Sec']
  const initialTime = 2 * 24 * 60 * 60 + 6 * 60 * 60 + 5 * 60 + 30

  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(initialTime)
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const days = String(Math.floor(timeLeft / (24 * 60 * 60))).padStart(2, '0')
  const hours = String(
    Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60)),
  ).padStart(2, '0')
  const minutes = String(Math.floor((timeLeft % (60 * 60)) / 60)).padStart(
    2,
    '0',
  )
  const seconds = String(timeLeft % 60).padStart(2, '0')

  const arrDate = [days, hours, minutes, seconds]

  return (
    <div className={styles.container}>
      <div className={styles.up}>
        {arrDate.map((item, index) => (
          <div
            className={styles.timer_box}
            key={index}
          >
            <span className={styles.time}>{item}</span>
          </div>
        ))}
      </div>
      <div className={styles.down}>
        {times.map((item, index) => (
          <span
            className={styles.date}
            key={index}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
