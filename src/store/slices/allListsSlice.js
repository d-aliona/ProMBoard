import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allLists: null,
};

const allListsSlice = createSlice({
  name: 'allLists',
  initialState,
  reducers: {
    setAllLists(state, action) {
      state.allLists = action.payload;
    },
  },
});

export const { setAllLists } = allListsSlice.actions;

export const allListsState = (state) => state.allLists.allLists;

export default allListsSlice.reducer;
