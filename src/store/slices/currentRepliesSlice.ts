import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentReplies: null,
};

const currentRepliesSlice = createSlice({
  name: 'currentReplies',
  initialState,
  reducers: {
    setCurrentReplies(state, action) {
      state.currentReplies = action.payload;
    },
  },
});

export const { setCurrentReplies } = currentRepliesSlice.actions;

export const currentRepliesState = (state: {currentReplies: {currentReplies: Replies | null}}) =>
  state.currentReplies.currentReplies;

export default currentRepliesSlice.reducer;
