import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AllCardsState = {
  allCards: Cards;
}

const initialState: AllCardsState = {
  allCards: [],
};

const allCardsSlice = createSlice({
  name: 'allCards',
  initialState,
  reducers: {
    setAllCards(state, action: PayloadAction<Cards>) {
      state.allCards = action.payload;
    },
  },
});

export const { setAllCards } = allCardsSlice.actions;

export const allCardsState = (state: {allCards: AllCardsState}) => state.allCards.allCards;

export default allCardsSlice.reducer;
