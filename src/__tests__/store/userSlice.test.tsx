import store from '../../store';
import { setUser, removeUser } from '../../store/slices/userSlice';
import { USER } from '../../_test_helpers/test_data';

describe('User redux state tests', () => {
    const initialUser = {
        email: null,
        id: null,
        firstName: '',
        lastName: '',
        guestBoards: [],
    }

    it('Should initially set user with no data', () => {
        const state = store.getState().user;
        expect(state.user).toEqual(initialUser);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setUser(USER.user));
        const getUser = store.getState().user;

        expect(getUser.user).toEqual( USER.user);
        expect(getUser.user.email).toBe('test@test.test');
    })

    it('Should be able to remove user from the store', async () => {
        store.dispatch(setUser(USER.user));
        store.dispatch(removeUser());
        const state = store.getState().user;
        expect(state.user).toEqual(initialUser);
    })
})