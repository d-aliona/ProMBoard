import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCards: null,
};

const currentCardsSlice = createSlice({
  name: 'currentCards',
  initialState,
  reducers: {
    setCurrentCards(state, action) {
      state.currentCards = action.payload;
    },
  },
});

export const { setCurrentCards } = currentCardsSlice.actions;

export const currentCardsState = (state) => state.currentCards.currentCards;

export default currentCardsSlice.reducer;
