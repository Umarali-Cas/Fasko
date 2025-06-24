/* eslint-disable no-constant-binary-expression */
import axios from 'axios'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTER_PATHS } from '../../routes/routePaths'

import styles from './Profile.module.scss'

export const Profile = () => {
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem('user' || '[]'))
  const [isModalOpen, setIsModalOpen] = useState(false)

  const successDelete = () => {
    localStorage.removeItem('user')
    localStorage.clear()

    axios
      .delete('http://localhost:5000/products/users')
      .then(() => console.log('deleted'))
      .catch((err) => console.error(err))

    setIsModalOpen((prev) => !prev)
    navigate(ROUTER_PATHS.main)
  }

  console.log(users)

  if (users) {
    return (
      <section className={styles.profile}>
        <div className={styles.container}>
          <button
            className={styles.back}
            onClick={() => navigate(-1)}
          >
            ✕
          </button>
          <div className={styles.user_container}>
            <img
              src={styles.user_icon}
              alt="icon"
            />
          </div>
          <div className={styles.user_info}>
            <span className={styles.firstName}>
              First Name: <strong>{users.firstName || ''}</strong>
              <button>| |</button>
            </span>
            <span className={styles.lastName}>
              Last Name: <strong>{users.lastName || ''}</strong>
              <button>| |</button>
            </span>
            <span className={styles.email}>
              Email: <strong>{users.email || ''}</strong>
            </span>
            <span className={styles.password}>
              Password: <strong>{users.password || ''}</strong>
            </span>
            <span className={styles.phone}>
              Phone: <strong>{users.phone || ''}</strong>
            </span>
            <button
              className={styles.deleteAccount}
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              Delete Account
            </button>
            {isModalOpen ? (
              <div className={styles.modal_success}>
                <div className={styles.modal_container}>
                  <h1>Do you wanna delete our account?</h1>
                  <div className={styles.buttons}>
                    <button onClick={() => setIsModalOpen((prev) => !prev)}>
                      No
                    </button>
                    <button onClick={successDelete}>Yes</button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    )
  } else {
    null
  }
}
