import store from '../../store';
import { setNotifications } from '../../store/slices/notificationsSlice';
import { NOTIFICATIONS } from '../../_test_helpers/test_data';

describe('Notifications redux state tests', () => {
    
    it('Should initially set notifications to an empty array', () => {
      const state = store.getState().notifications;
      expect(state.notifications).toEqual([]);
      expect(state.notifications.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setNotifications(NOTIFICATIONS.notifications));
        const notifications = store.getState().notifications;

        expect(notifications.notifications.length).toEqual(1);
        expect(notifications.notifications).toEqual(NOTIFICATIONS.notifications);
        expect(notifications.notifications[0].text).toBe('text1');
    })
})