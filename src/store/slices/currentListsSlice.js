import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLists: [],
};

const currentListsSlice = createSlice({
  name: 'currentLists',
  initialState,
  reducers: {
    setCurrentLists(state, action) {
      if (state) {
        state.currentLists = action?.payload;
      } else {
        state = { currentLists: action?.payload };
        return state;
      }
    },
  },
});

export const { setCurrentLists } = currentListsSlice?.actions;

export const currentListsState = (state) => state?.currentLists?.currentLists;

export default currentListsSlice.reducer;
