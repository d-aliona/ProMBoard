import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: {
    firstName: '',
    lastName: '',
  },
}

const avatarSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.name = action.payload
    },
    removeAvatar(state) {
      state.name.firstName = ''
      state.name.lastName = ''
    },
  },
})

export const { setAvatar, removeAvatar } = avatarSlice.actions
export const avatarState = (state) => state.user.avatar

export default avatarSlice.reducer