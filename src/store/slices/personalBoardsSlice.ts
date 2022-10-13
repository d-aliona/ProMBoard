import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalBoards: null,
};

const personalBoardsSlice = createSlice({
  name: 'personalBoards',
  initialState,
  reducers: {
    setPersonalBoards(state, action) {
      state.personalBoards = action.payload;
    },
  },
});

export const { setPersonalBoards } = personalBoardsSlice.actions;

export const personalBoardsState = (state: {personalBoards: {personalBoards: Boards | null}}) =>
  state.personalBoards.personalBoards;

export default personalBoardsSlice.reducer;
