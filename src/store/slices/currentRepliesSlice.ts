import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentRepliesState = {
  currentReplies: Replies;
}

const initialState: CurrentRepliesState = {
  currentReplies: [],
};

const currentRepliesSlice = createSlice({
  name: 'currentReplies',
  initialState,
  reducers: {
    setCurrentReplies(state, action: PayloadAction<Replies>) {
      state.currentReplies = action.payload;
    },
  },
});

export const { setCurrentReplies } = currentRepliesSlice.actions;

export const currentRepliesState = (state: {currentReplies: CurrentRepliesState}) =>
  state.currentReplies.currentReplies;

export default currentRepliesSlice.reducer;
