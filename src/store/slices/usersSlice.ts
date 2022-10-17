import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UsersState = {
  users: Users;
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Users>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const usersState = (state: {users: UsersState}) => state.users.users;

export default usersSlice.reducer;
