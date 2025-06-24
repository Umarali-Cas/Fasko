/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { registerUser } from '../../../api/redux/userSlice'
import logo from '../../../assets/icons/logo.svg'
import google from '../../../assets/images/google.png'
import mail from '../../../assets/images/mail.png'
import signUpImage from '../../../assets/images/signInImage.png'
import { Button } from '../../../common/ui/Button/Button'
import { ROUTER_PATHS } from '../../../routes/routePaths'
import { saveToLocalStorage } from '../../../utils/localStorage'
import { validateEmail, validatePassword } from '../../../utils/validation'

import styles from './SignUp.module.scss'

export const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    const { firstName, lastName, email, phone, password, confirmPassword } =
      form

    if (!validateEmail(email)) return setError('Неправильный email')
    if (!validatePassword(password))
      return setError('Пароль должен быть от 6 символов')
    if (password !== confirmPassword) return setError('Пароли не совпадают')

    try {
      const res = await fetch(
        `http://localhost:5000/users?email=${email.trim()}`,
      )
      const existingUsers = await res.json()

      if (existingUsers.length > 0) {
        return setError('Пользователь уже существует')
      }

      const newUser = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
      }

      const createdRes = await fetch(`http://localhost:5000/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })

      if (!createdRes.ok) {
        throw new Error('Ошибка от сервера при создании пользователя')
      }
      const user = JSON.parse(localStorage.getItem('userEmail'))
      localStorage.setItem('user', JSON.stringify(user))

      const createdUser = await createdRes.json()

      dispatch(registerUser(createdUser))
      saveToLocalStorage('user', createdUser)
      navigate(ROUTER_PATHS.main)
    } catch (err) {
      console.error(err)
      setError('Ошибка при регистрации')
    }
  }

  return (
    <section className={styles.signUp}>
      <div className={styles.container}>
        <img
          src={signUpImage}
          alt="Sign up image"
        />
        <div className={styles.SignUpForm}>
          <img
            src={logo}
            alt="logo"
          />
          <h3 className={styles.fasko}>Create Account</h3>

          <div className={styles.google_mail}>
            <button className={styles.google}>
              <img
                src={google}
                alt="google"
              />
              Sign up with Google
            </button>
            <button className={styles.mail}>
              <img
                src={mail}
                alt="mail"
              />
              Sign up with Email
            </button>
          </div>

          <div className={styles.or}>
            <hr />
            <h1>OR</h1>
            <hr />
          </div>

          <form onSubmit={handleRegister}>
            <div className={styles.inputs}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className={styles.email}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className={styles.password}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={styles.password}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className={styles.password}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={styles.password}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={styles.password}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.buttons}>
              <Button
                type="submit"
                className={styles.signInBtn}
              >
                Create Account
              </Button>
              <div className={styles.signUp}>
                <p>Already have an account?</p>
                <a href={ROUTER_PATHS.signIn}>Login</a>
              </div>
            </div>

            <p className={styles.conditions}>FASCO Terms & Conditions</p>
          </form>
        </div>
      </div>
    </section>
  )
}
