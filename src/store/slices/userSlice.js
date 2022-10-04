import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: null,
    id: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user.email = null;
      state.user.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const userState = (state) => state.user.user;

export default userSlice.reducer;
