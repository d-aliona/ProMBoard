import store from '../../store';
import { setCurrentCards } from '../../store/slices/currentCardsSlice';
import { CURRENTCARDS } from '../../_test_helpers/test_data';

describe('Current Cards redux state tests', () => {
    
    it('Should initially set current cards to an empty array', () => {
      const state = store.getState().currentCards;
      expect(state.currentCards).toEqual([]);
      expect(state.currentCards.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setCurrentCards(CURRENTCARDS.currentCards));
        const currentcards = store.getState().currentCards;

        expect(currentcards.currentCards.length).toEqual(2);
        expect(currentcards.currentCards).toEqual( CURRENTCARDS.currentCards);
        expect(currentcards.currentCards[1].cardTitle).toBe('c2');
    })
})