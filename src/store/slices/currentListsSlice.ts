import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentListsState = {
  currentLists: Lists;
}

const initialState: CurrentListsState = {
  currentLists: [],
};

const currentListsSlice = createSlice({
  name: 'currentLists',
  initialState,
  reducers: {
    setCurrentLists(state, action: PayloadAction<Lists>) {
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

export const currentListsState = (state: {currentLists: CurrentListsState}) => state?.currentLists?.currentLists;

export default currentListsSlice.reducer;
