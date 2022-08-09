import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentLists: null,
}

const currentListsSlice = createSlice({
  name: 'currentLists',
  initialState,
  reducers: {
    setCurrentLists(state, action) {
      state.currentLists = action.payload
    },
  },
})

export const { setCurrentLists } = currentListsSlice.actions

export const currentListsState = (state) => state.currentLists.currentLists

export default currentListsSlice.reducer