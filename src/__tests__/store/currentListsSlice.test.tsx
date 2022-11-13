import store from '../../store';
import { setCurrentLists } from '../../store/slices/currentListsSlice';
import { CURRENTLISTS } from '../../_test_helpers/test_data';

describe('Current Lists redux state tests', () => {
    
    it('Should initially set current lists to an empty array', () => {
      const state = store.getState().currentLists;
      expect(state.currentLists).toEqual([]);
      expect(state.currentLists.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setCurrentLists(CURRENTLISTS.currentLists));
        const currentlists = store.getState().currentLists;

        expect(currentlists.currentLists.length).toEqual(3);
        expect(currentlists.currentLists).toEqual( CURRENTLISTS.currentLists);
        expect(currentlists.currentLists[0].listTitle).toBe('l1');
    })
})