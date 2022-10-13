import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notPersonalBoards: null,
};

const notPersonalBoardsSlice = createSlice({
  name: 'notPersonalBoards',
  initialState,
  reducers: {
    setNotPersonalBoards(state, action) {
      state.notPersonalBoards = action.payload;
    },
  },
});

export const { setNotPersonalBoards } = notPersonalBoardsSlice.actions;

export const notPersonalBoardsState = (state: {notPersonalBoards: {notPersonalBoards: Boards | null}}) =>
  state.notPersonalBoards.notPersonalBoards;

export default notPersonalBoardsSlice.reducer;
