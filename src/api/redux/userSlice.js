import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logoutUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
    },
  },
})

export const { registerUser, logoutUser } = userSlice.actions
export default userSlice.reducer
