import store from '../../store';
import { setCurrentDragStartCard } from '../../store/slices/currentDragStartCardSlice';
import { CURRENTDRAG } from '../../_test_helpers/test_data';

describe('Current DragStartCard redux state tests', () => {
    
    it('Should initially set current drag start card to an object with null properties', () => {
        const initial = {
            listIndex: null,
            cardIndex: null,
            listID: null,
            cardID: null,
        }

      const state = store.getState().currentDragStartCard;
      expect(state.currentDragStartCard).toEqual(initial);
    })

    it('Should be able to dispatch data into a store', async () => {
        store.dispatch(setCurrentDragStartCard(CURRENTDRAG.currentDragStartCard));
        const currentdrag = store.getState().currentDragStartCard;

        expect(currentdrag.currentDragStartCard).toEqual( CURRENTDRAG.currentDragStartCard);
        expect(currentdrag.currentDragStartCard.cardID).toBe('cid');
    })
})