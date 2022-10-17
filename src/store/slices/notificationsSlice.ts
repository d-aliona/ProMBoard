import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationsState = {
  notifications: Notifications;
} 

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notifications>) {
      state.notifications = action.payload;
    },
  },
});

export const { setNotifications } = notificationsSlice.actions;

export const notificationsState = (state: {notifications: NotificationsState}) => state.notifications.notifications;

export default notificationsSlice.reducer;
