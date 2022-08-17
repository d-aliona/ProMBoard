import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentDragEndCard: {
    order: null,
    listID: null,
  },
}

const currentDragEndCardSlice = createSlice({
  name: 'currentDragEndCard',
  initialState,
  reducers: {
    setCurrentDragEndCard(state, action) {
      state.currentDragEndCard = action.payload
    },
  },
})

export const { setCurrentDragEndCard } = currentDragEndCardSlice.actions

export const currentDragEndCardState = (state) => state.currentDragEndCard.currentDragEndCard

export default currentDragEndCardSlice.reducer