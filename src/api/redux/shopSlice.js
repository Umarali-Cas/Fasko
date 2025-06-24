import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'shop/fetchProducts',
  async ({ page, limit, selectedSize }, { rejectWithValue }) => {
    try {
      const params = {
        _page: page,
        _limit: limit,
      }

      if (selectedSize) {
        params.size = selectedSize
      }

      const response = await axios.get('http://localhost:5000/products_shop', {
        params,
      })

      const allResponse = await axios.get('http://localhost:5000/products_shop')
      const totalCount = allResponse.data.length
      console.log(totalCount)

      return {
        products: response.data,
        totalCount,
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const shopSlice = createSlice({
  name: 'products_shop',
  initialState: {
    items: [],
    status: 'idle',
    currentPage: 1,
    totalCount: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.products || []
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { setPage } = shopSlice.actions
export default shopSlice.reducer
