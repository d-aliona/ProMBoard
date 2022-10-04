import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: {
    title: null,
    colorBoard: null,
    id: null,
  },
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard(state, action) {
      state.board = action.payload;
    },
  },
});

export const { setBoard } = boardSlice.actions;

export const boardState = (state) => state.board.board;

export default boardSlice.reducer;
