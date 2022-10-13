import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentCommentsState = {
  currentComments: Comments;
}

const initialState: CurrentCommentsState = {
  currentComments: [],
};

const currentCommentsSlice = createSlice({
  name: 'currentComments',
  initialState,
  reducers: {
    setCurrentComments(state, action: PayloadAction<Comments>) {
      state.currentComments = action.payload;
    },
  },
});

export const { setCurrentComments } = currentCommentsSlice.actions;

export const currentCommentsState = (state: {currentComments: CurrentCommentsState}) =>
  state.currentComments.currentComments;

export default currentCommentsSlice.reducer;
