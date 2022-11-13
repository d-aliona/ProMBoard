import store from '../../store';
import { setAllBoards } from '../../store/slices/allBoardsSlice';
import { waitFor } from '@testing-library/react';
import { ALLBOARDS } from '../../_test_helpers/test_data';

describe('All Boards redux state tests', () => {
    
    it('Should initially set all boards to an empty array', () => {
      const state = store.getState().allBoards;
      expect(state.allBoards).toEqual([]);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setAllBoards(ALLBOARDS.allBoards));
        const allboards = store.getState().allBoards;

        await waitFor(() => {
            expect(allboards.allBoards.length).toEqual(2);
            expect(allboards).toEqual( ALLBOARDS);
        })
    })
})