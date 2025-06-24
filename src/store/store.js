import { configureStore } from '@reduxjs/toolkit'

import productsReducer from '../api/redux/productsSlice'
import productsShopReducer from '../api/redux/shopSlice'
import userReducer from '../api/redux/userSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    products_shop: productsShopReducer,
    user: userReducer,
  },
})

export default store
