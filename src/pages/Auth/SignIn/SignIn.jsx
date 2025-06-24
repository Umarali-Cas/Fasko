import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { registerUser } from '../../../api/redux/userSlice'
import logo from '../../../assets/icons/logo.svg'
import google from '../../../assets/images/google.png'
import mail from '../../../assets/images/mail.png'
import signInImage from '../../../assets/images/signInImage.png'
import { Button } from '../../../common/ui/Button/Button'
import { ROUTER_PATHS } from '../../../routes/routePaths'
import { saveToLocalStorage } from '../../../utils/localStorage'
import { validateEmail, validatePassword } from '../../../utils/validation'

import styles from './SignIn.module.scss'

export const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const apiUrl = 'http://localhost:5000/users'

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) return setError('Неправильный email')
    if (!validatePassword(password))
      return setError('Пароль должен быть от 6 символов')

    try {
      const res = await fetch(`${apiUrl}?email=${email}`)
      const users = await res.json()

      if (users.length === 0) {
        return setError('Пользователь не найден')
      }

      const user = users[0]

      if (user.password !== password) {
        return setError('Неверный пароль')
      }

      dispatch(registerUser(user))
      saveToLocalStorage('user', user)
      navigate(ROUTER_PATHS.main)
    } catch (err) {
      setError('Ошибка входа')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) return setError('Неправильный email')
    if (!validatePassword(password))
      return setError('Пароль должен быть от 6 символов')

    try {
      const res = await fetch(`${apiUrl}?email=${email}`)
      const users = await res.json()

      if (users.length > 0) {
        return setError('Пользователь уже существует')
      }

      const newUser = { email, password }

      const createRes = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })

      const user = JSON.parse(localStorage.getItem('userEmail'))
      localStorage.setItem('user', JSON.stringify(user))

      const createdUser = await createRes.json()
      dispatch(registerUser(createdUser))
      saveToLocalStorage('user', createdUser)
      navigate(ROUTER_PATHS.main)
    } catch (err) {
      setError('Ошибка регистрации')
    }
  }

  return (
    <section className={styles.signIn}>
      <div className={styles.container}>
        <img
          src={signInImage}
          alt="Sign in"
        />
        <div className={styles.SignInForm}>
          <img
            src={logo}
            alt="logo"
          />
          <h3 className={styles.fasko}>Добро пожаловать в FASCO</h3>

          <div className={styles.google_mail}>
            <button className={styles.google}>
              <img
                src={google}
                alt="google"
              />
              Войти через Google
            </button>
            <button className={styles.mail}>
              <img
                src={mail}
                alt="mail"
              />
              Войти через Email
            </button>
          </div>

          <div className={styles.or}>
            <hr />
            <h1>ИЛИ</h1>
            <hr />
          </div>

          <form>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.email}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.password}
            />

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.buttons}>
              <Button
                onClick={handleSignIn}
                className={styles.signInBtn}
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate(ROUTER_PATHS.signUp)}
                className={styles.registerBtn}
              >
                Register
              </Button>
            </div>

            <p className={styles.conditions}>FASCO Условия и Правила</p>
          </form>
        </div>
      </div>
    </section>
  )
}
