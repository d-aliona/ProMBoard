import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCards: null,
};

const allCardsSlice = createSlice({
  name: 'allCards',
  initialState,
  reducers: {
    setAllCards(state, action) {
      state.allCards = action.payload;
    },
  },
});

export const { setAllCards } = allCardsSlice.actions;

export const allCardsState = (state) => state.allCards.allCards;

export default allCardsSlice.reducer;
