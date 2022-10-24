import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  user: User;
}

const initialState: UserState = {
  user: {
    email: null,
    id: null,
    firstName: '',
    lastName: '',
    guestBoards: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user.email = null;
      state.user.id = null;
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.guestBoards = [];
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const userState = (state: {user: UserState}) => state.user.user;

export default userSlice.reducer;
