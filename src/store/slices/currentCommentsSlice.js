import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentComments: null,
};

const currentCommentsSlice = createSlice({
  name: 'currentComments',
  initialState,
  reducers: {
    setCurrentComments(state, action) {
      state.currentComments = action.payload;
    },
  },
});

export const { setCurrentComments } = currentCommentsSlice.actions;

export const currentCommentsState = (state) =>
  state.currentComments.currentComments;

export default currentCommentsSlice.reducer;
