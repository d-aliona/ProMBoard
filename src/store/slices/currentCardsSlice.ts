import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentCardsState = {
  currentCards: Cards;
}

const initialState: CurrentCardsState = {
  currentCards: [],
};

const currentCardsSlice = createSlice({
  name: 'currentCards',
  initialState,
  reducers: {
    setCurrentCards(state, action: PayloadAction<Cards>) {
      state.currentCards = action.payload;
    },
  },
});

export const { setCurrentCards } = currentCardsSlice.actions;

export const currentCardsState = (state: {currentCards: CurrentCardsState}) => 
  state.currentCards.currentCards;

export default currentCardsSlice.reducer;
