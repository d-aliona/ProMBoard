import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const usersState = (state) => state.users.users

export default usersSlice.reducer