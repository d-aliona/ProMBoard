import store from '../../store';
import { setAllCards } from '../../store/slices/allCardsSlice';
import { ALLCARDS } from '../../_test_helpers/test_data';

describe('All Cards redux state tests', () => {
    
    it('Should initially set all cards to an empty array', () => {
      const state = store.getState().allCards;
      expect(state.allCards).toEqual([]);
      expect(state.allCards.length).toEqual(0);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setAllCards(ALLCARDS.allCards));
        const allcards = store.getState().allCards;

        expect(allcards.allCards.length).toEqual(2);
        expect(allcards.allCards).toEqual( ALLCARDS.allCards);
        expect(allcards.allCards[0].commentsExist).toBe(true);
        
        const updatedCards = {
            allCards: [
                {   id: 'id1',
                    boardID: 'bid1',
                    cardColor: 'red',
                    cardTitle: 'c1',
                    commentsExist: false,
                    commentsNumber: 2,
                    description: 'desc1',
                    listID: 'l1',
                    position: 5,
                    assignedUsers: ['1']
                } 
            ]
        }
        store.dispatch(setAllCards(updatedCards.allCards));
        const updatedallcards = store.getState().allCards;
        
        expect(updatedallcards.allCards.length).toEqual(1);
        expect(updatedallcards.allCards).toEqual( updatedCards.allCards);
        expect(updatedallcards.allCards[0].commentsExist).toBe(false);
    })
})