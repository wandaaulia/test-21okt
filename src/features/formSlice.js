import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tokenVal: 0,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.tokenVal = action.payload;
    },
  },
})


export const { setToken } = formSlice.actions

export default formSlice.reducer