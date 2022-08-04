import { createSlice } from '@reduxjs/toolkit'

const initialState = {content: '?'}
//   avatar: {
//     content: '?'
//   },
// ]

const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar(state, action) {
      state.content = action.payload
    },
    removeAvatar(state) {
      state.avatar.content = '?'
    },
  },
})

export const { setAvatar, removeAvatar } = avatarSlice.actions
export const avatarState = (state) => state.avatar.content

export default avatarSlice.reducer