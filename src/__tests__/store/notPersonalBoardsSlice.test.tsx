import store from '../../store';
import { setNotPersonalBoards } from '../../store/slices/notPersonalBoardsSlice';
import { NOTPERSONALBOARDS } from '../../_test_helpers/test_data';

describe('NotPersonalBoards redux state tests', () => {
    
    it('Should initially set NotPersonalBoards to an empty array', () => {
      const state = store.getState().notPersonalBoards;
      expect(state.notPersonalBoards).toEqual([]);
      expect(state.notPersonalBoards.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setNotPersonalBoards(NOTPERSONALBOARDS.notPersonalBoards));
        const notpersboards = store.getState().notPersonalBoards;

        expect(notpersboards.notPersonalBoards.length).toEqual(2);
        expect(notpersboards.notPersonalBoards).toEqual(NOTPERSONALBOARDS.notPersonalBoards);
        expect(notpersboards.notPersonalBoards[1].boardColor).toBe('blue');
    })
})