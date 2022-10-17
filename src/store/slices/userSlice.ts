import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Userr = {
  email: string | null;
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  guestBoards: string[];
}
type UserrState = {
  user: Userr;
}

const initialState: UserrState = {
  user: {
    email: null,
    id: null,
    firstName: null,
    lastName: null,
    guestBoards: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Userr>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user.email = null;
      state.user.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const userState = (state: {user: UserrState}) => state.user.user;

export default userSlice.reducer;
