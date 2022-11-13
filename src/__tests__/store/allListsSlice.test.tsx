import store from '../../store';
import { setAllLists } from '../../store/slices/allListsSlice';
import { ALLLISTS } from '../../_test_helpers/test_data';

describe('All Lists redux state tests', () => {
    
    it('Should initially set all lists to an empty array', () => {
      const state = store.getState().allLists;
      expect(state.allLists).toEqual([]);
      expect(state.allLists.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setAllLists(ALLLISTS.allLists));
        const alllists = store.getState().allLists;

        expect(alllists.allLists.length).toEqual(3);
        expect(alllists.allLists).toEqual( ALLLISTS.allLists);
        expect(alllists.allLists[0].listTitle).toBe('l1');
    })
})