import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AllListsState = {
  allLists: Lists;
}

const initialState: AllListsState = {
  allLists: [],
};

const allListsSlice = createSlice({
  name: 'allLists',
  initialState,
  reducers: {
    setAllLists(state, action: PayloadAction<Lists>) {
      state.allLists = action.payload;
    },
  },
});

export const { setAllLists } = allListsSlice.actions;

export const allListsState = (state: {allLists: AllListsState}) => state.allLists.allLists;

export default allListsSlice.reducer;
