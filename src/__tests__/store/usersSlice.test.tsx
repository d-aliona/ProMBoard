import store from '../../store';
import { setUsers } from '../../store/slices/usersSlice';
import { USERS } from '../../_test_helpers/test_data';

describe('All users redux state tests', () => {
    
    it('Should initially set all users to an empty array', () => {
      const state = store.getState().users;
      expect(state.users).toEqual([]);
      expect(state.users.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setUsers(USERS.users));
        const allusers = store.getState().users;

        expect(allusers.users.length).toEqual(2);
        expect(allusers.users).toEqual( USERS.users);
        expect(allusers.users[1].guestBoards.length).toBe(3);
    })
})