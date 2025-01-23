import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GlobalStoreState } from "@/types/store"

const initialState: GlobalStoreState = {
  count: 0
}

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    reset: (state) => ({ ...state, count: 0 }),
    increment: (state) => ({ ...state, count: state.count + 1 }),
    decrement: (state) => ({ ...state, count: state.count - 1 }),
    updateCount: (state, action: PayloadAction<number>) => ({ ...state, count: action.payload })
  }
})

export const { reset, increment, decrement, updateCount } = exampleSlice.actions
export default exampleSlice.reducer
