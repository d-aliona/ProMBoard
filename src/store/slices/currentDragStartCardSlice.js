import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDragStartCard: {
    listIndex: null,
    cardIndex: null,
    listID: null,
    cardID: null,
  },
};

const currentDragStartCardSlice = createSlice({
  name: 'currentDragStartCard',
  initialState,
  reducers: {
    setCurrentDragStartCard(state, action) {
      state.currentDragStartCard = action.payload;
    },
  },
});

export const { setCurrentDragStartCard } = currentDragStartCardSlice.actions;

export const currentDragStartCardState = (state) =>
  state.currentDragStartCard.currentDragStartCard;

export default currentDragStartCardSlice.reducer;
