import { Outlet, useLocation } from 'react-router-dom'

import { Footer } from '../common/components/Footer/Footer'
import { Header } from '../common/components/Header'
import { ROUTER_PATHS } from '../routes/routePaths'

const Layout = () => {
  const location = useLocation()
  const hideHeaderRoutes = [
    ROUTER_PATHS.signIn,
    ROUTER_PATHS.signUp,
    ROUTER_PATHS.forgetPassword,
    ROUTER_PATHS.profile,
  ]
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname)
  return (
    <>
      {!shouldHideHeader && <Header />}
      <Outlet />
      {!shouldHideHeader && <Footer />}
    </>
  )
}

export default Layout
