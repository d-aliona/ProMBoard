import { createSlice } from '@reduxjs/toolkit'

// const initialState = null
// const initialState = {
//   board: {
//     title: null,
//     colorBoard: null,
//     id: null,
//   },
// }
const initialState = {
  currentDragStartCard: {
    order: null,
    listId: null,
  },
}

const currentDragStartCardSlice = createSlice({
  name: 'currentDragStartCard',
  initialState,
  reducers: {
    setCurrentDragStartCard(state, action) {
      state.currentDragStartCard = action.payload
    },
  },
})

export const { setCurrentDragStartCard } = currentDragStartCardSlice.actions

export const currentDragStartCardState = (state) => state.currentDragStartCard.currentDragStartCard

export default currentDragStartCardSlice.reducer