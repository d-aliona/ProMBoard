import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PersonalBoardsState = {
  personalBoards: Boards;
}

const initialState: PersonalBoardsState = {
  personalBoards: [],
};

const personalBoardsSlice = createSlice({
  name: 'personalBoards',
  initialState,
  reducers: {
    setPersonalBoards(state, action: PayloadAction<Boards>) {
      state.personalBoards = action.payload;
    },
  },
});

export const { setPersonalBoards } = personalBoardsSlice.actions;

export const personalBoardsState = (state: {personalBoards: PersonalBoardsState}) =>
  state.personalBoards.personalBoards;

export default personalBoardsSlice.reducer;
