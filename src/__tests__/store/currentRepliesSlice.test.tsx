import store from '../../store';
import { setCurrentReplies } from '../../store/slices/currentRepliesSlice';
import { CURRENTREPLIES } from '../../_test_helpers/test_data';

describe('Current Replies redux state tests', () => {
    
    it('Should initially set current replies to an empty array', () => {
      const state = store.getState().currentReplies;
      expect(state.currentReplies).toEqual([]);
      expect(state.currentReplies.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setCurrentReplies(CURRENTREPLIES.currentReplies));
        const currentreplies = store.getState().currentReplies;

        expect(currentreplies.currentReplies.length).toEqual(2);
        expect(currentreplies.currentReplies).toEqual(CURRENTREPLIES.currentReplies);
        expect(currentreplies.currentReplies[1].reply).toBe('reply2');
    })
})