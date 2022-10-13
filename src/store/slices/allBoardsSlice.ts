import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AllBoardsState = {
  allBoards: Boards;
}

const initialState: AllBoardsState = {
  allBoards: [],
};

const allBoardsSlice = createSlice({
  name: 'allBoards',
  initialState,
  reducers: {
    setAllBoards(state, action: PayloadAction<Boards>) {
      state.allBoards = action.payload;
    },
  },
});

export const { setAllBoards } = allBoardsSlice.actions;

export const allBoardsState = (state: {allBoards: AllBoardsState}) => state.allBoards.allBoards;

export default allBoardsSlice.reducer;
