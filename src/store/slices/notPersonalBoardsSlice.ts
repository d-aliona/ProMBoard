import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotPersonalBoardsState = {
  notPersonalBoards: Boards;
}

const initialState: NotPersonalBoardsState = {
  notPersonalBoards: [],
};

const notPersonalBoardsSlice = createSlice({
  name: 'notPersonalBoards',
  initialState,
  reducers: {
    setNotPersonalBoards(state, action: PayloadAction<Boards>) {
      state.notPersonalBoards = action.payload;
    },
  },
});

export const { setNotPersonalBoards } = notPersonalBoardsSlice.actions;

export const notPersonalBoardsState = (state: {notPersonalBoards: NotPersonalBoardsState}) =>
  state.notPersonalBoards.notPersonalBoards;

export default notPersonalBoardsSlice.reducer;
