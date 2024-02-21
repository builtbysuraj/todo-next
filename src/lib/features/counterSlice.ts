import { createSlice } from '@reduxjs/toolkit'

const initialState = 0

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addCount(state) {
      return state + 1
    },
  },
})

export const { addCount } = counterSlice.actions
export default counterSlice.reducer
