import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allBoards: null,
};

const allBoardsSlice = createSlice({
  name: 'allBoards',
  initialState,
  reducers: {
    setAllBoards(state, action) {
      state.allBoards = action.payload;
    },
  },
});

export const { setAllBoards } = allBoardsSlice.actions;

export const allBoardsState = (state) => state.allBoards.allBoards;

export default allBoardsSlice.reducer;
