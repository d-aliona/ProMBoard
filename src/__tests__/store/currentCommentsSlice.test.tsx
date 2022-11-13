import store from '../../store';
import { setCurrentComments } from '../../store/slices/currentCommentsSlice';
import { CURRENTCOMMENTS } from '../../_test_helpers/test_data';

describe('Current Comments redux state tests', () => {
    
    it('Should initially set current comments to an empty array', () => {
      const state = store.getState().currentComments;
      expect(state.currentComments).toEqual([]);
      expect(state.currentComments.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setCurrentComments(CURRENTCOMMENTS.currentComments));
        const currentcomments = store.getState().currentComments;

        expect(currentcomments.currentComments.length).toEqual(2);
        expect(currentcomments.currentComments).toEqual( CURRENTCOMMENTS.currentComments);
        expect(currentcomments.currentComments[0].comment).toBe('com1');
    })
})
