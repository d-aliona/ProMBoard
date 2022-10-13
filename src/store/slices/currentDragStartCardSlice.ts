import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentDrag = {
  cardID: string | null;
  cardIndex: number | null;
  listID: string | null;
  listIndex: number | null;
}

type DragStartCardState = {
  currentDragStartCard: CurrentDrag;
}

const initialState: DragStartCardState = {
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
    setCurrentDragStartCard(state, action: PayloadAction<CurrentDrag>) {
      state.currentDragStartCard = action.payload;
    },
  },
});

export const { setCurrentDragStartCard } = currentDragStartCardSlice.actions;

export const currentDragStartCardState = (state: {currentDragStartCard: DragStartCardState}) =>
  state.currentDragStartCard.currentDragStartCard;

export default currentDragStartCardSlice.reducer;
