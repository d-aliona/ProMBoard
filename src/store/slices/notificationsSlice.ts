import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
  },
});

export const { setNotifications } = notificationsSlice.actions;

export const notificationsState = (state: {notifications: {notifications: Notifications | null}}) => state.notifications.notifications;

export default notificationsSlice.reducer;
