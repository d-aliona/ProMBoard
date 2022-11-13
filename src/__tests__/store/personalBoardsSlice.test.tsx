import store from '../../store';
import { setPersonalBoards } from '../../store/slices/personalBoardsSlice';
import { PERSONALBOARDS } from '../../_test_helpers/test_data';

describe('PersonalBoards redux state tests', () => {
    
    it('Should initially set PersonalBoards to an empty array', () => {
      const state = store.getState().personalBoards;
      expect(state.personalBoards).toEqual([]);
      expect(state.personalBoards.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
        const persboards = store.getState().personalBoards;

        expect(persboards.personalBoards.length).toEqual(2);
        expect(persboards.personalBoards).toEqual(PERSONALBOARDS.personalBoards);
        expect(persboards.personalBoards[0].statusOpened).toBe(true);
    })
})