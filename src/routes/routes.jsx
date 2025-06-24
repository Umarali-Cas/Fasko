import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from '../layouts/Layout'
import { SignIn } from '../pages/Auth/SignIn'
import { SignUp } from '../pages/Auth/SignUp'
import { Cart } from '../pages/Cart/Cart'
import { Favorites } from '../pages/Favorites/Favorites'
import { Main } from '../pages/Main'
import { Shop } from '../pages/Main/Shop/Shop'
import { NewArrivalsPage } from '../pages/NewArrivalsPage/NewArrivalsPage'
import { ProductPage } from '../pages/ProductPage'
import { Profile } from '../pages/Profile'

import { ROUTER_PATHS } from './routePaths'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ROUTER_PATHS.main,
        element: <Main />,
      },
      {
        path: ROUTER_PATHS.deals,
        element: <h1>deals</h1>,
      },
      {
        path: ROUTER_PATHS.arrivals,
        element: <NewArrivalsPage />,
      },
      {
        path: ROUTER_PATHS.packages,
        element: <h1>packages</h1>,
      },
      {
        path: ROUTER_PATHS.shop,
        element: <Shop />,
      },
      {
        path: ROUTER_PATHS.signIn,
        element: <SignIn />,
      },
      {
        path: ROUTER_PATHS.signUp,
        element: <SignUp />,
      },
      {
        path: `${ROUTER_PATHS.productPage}/:id`,
        element: <ProductPage />,
      },
      {
        path: ROUTER_PATHS.cart,
        element: <Cart />,
      },
      {
        path: ROUTER_PATHS.favorites,
        element: <Favorites />,
      },
      {
        path: ROUTER_PATHS.profile,
        element: <Profile />,
      },
    ],
  },
])
