import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { setupStore } from '../../store'
import { setAllBoards } from '../../store/slices/allBoardsSlice';
import { setUser } from '../../store/slices/userSlice';
import { setPersonalBoards } from '../../store/slices/personalBoardsSlice';
import { setAllLists } from '../../store/slices/allListsSlice';
import { setAllCards } from '../../store/slices/allCardsSlice';
import { setCurrentComments } from '../../store/slices/currentCommentsSlice';
import { setCurrentReplies } from '../../store/slices/currentRepliesSlice';

import  userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../_test_helpers/test_utils';
import { cards, USER, ALLBOARDS, PERSONALBOARDS, ALLLISTS, ALLCARDS, CURRENTCOMMENTS, CURRENTREPLIES } from '../../_test_helpers/test_data';
import CopyCard from '../../features/CopyCard';
 
describe('Copy card form tests', () => {
    const testCard = cards[0];
    const setClickCopyCard = jest.fn();
    
    afterEach(() => {
        cleanup;
    })
  
    it('should render a form and copyCard button should be disabled initially', async() => {
        const user = userEvent.setup(); 
        const store = setupStore();
        store.dispatch(setUser(USER.user));
        store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
        store.dispatch(setAllBoards(ALLBOARDS.allBoards));
        store.dispatch(setAllLists(ALLLISTS.allLists));
        store.dispatch(setAllCards(ALLCARDS.allCards));
        store.dispatch(setCurrentComments(CURRENTCOMMENTS.currentComments));
        store.dispatch(setCurrentReplies(CURRENTREPLIES.currentReplies));      
        renderWithProviders(<CopyCard 
            card={testCard} setClickCopyCard={setClickCopyCard} />, { store })          
                
        const copyCardDiv = screen.getByText('Copy card');
        expect(copyCardDiv).toBeInTheDocument();
        expect(copyCardDiv.getAttribute('class')).toMatch(/disabled/gi);
    
        const input = screen.getByPlaceholderText('new title');
        await user.type(input, 'test');
        expect(copyCardDiv.getAttribute('class')).not.toMatch(/disabled/gi);
    })

    it('should display No lists in listsField and position zero after choosing a board with no lists', async() => {
        const user = userEvent.setup(); 
        const store = setupStore();
        store.dispatch(setUser(USER.user));
        store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
        store.dispatch(setAllBoards(ALLBOARDS.allBoards));
        store.dispatch(setAllLists(ALLLISTS.allLists));
        store.dispatch(setAllCards(ALLCARDS.allCards));
        store.dispatch(setCurrentComments(CURRENTCOMMENTS.currentComments));
        store.dispatch(setCurrentReplies(CURRENTREPLIES.currentReplies));      
        renderWithProviders(<CopyCard 
            card={testCard} setClickCopyCard={setClickCopyCard} />, { store })          
                
        const copyCardItems = document.getElementsByClassName('copyCardItem'); 
        const boardsItem = copyCardItems[0]
        await user.click(boardsItem); // click boards
        
        const dropItem = document.getElementsByClassName('copyCardDropItem')[2]; // select a board with no lists
        await user.click(dropItem);
        expect(screen.getByText(/No lists/i)).toBeInTheDocument();
        const positionItem = copyCardItems[2];
        expect(positionItem.textContent).toContain('0');
    })

    it('should display checked checkboxes after clicking', async() => {
        const user = userEvent.setup(); 
        const store = setupStore();
        store.dispatch(setUser(USER.user));
        store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
        store.dispatch(setAllBoards(ALLBOARDS.allBoards));
        store.dispatch(setAllLists(ALLLISTS.allLists));
        store.dispatch(setAllCards(ALLCARDS.allCards));
        store.dispatch(setCurrentComments(CURRENTCOMMENTS.currentComments));
        store.dispatch(setCurrentReplies(CURRENTREPLIES.currentReplies));      
        renderWithProviders(<CopyCard 
            card={testCard} setClickCopyCard={setClickCopyCard} />, { store })          
                
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(2);
        await user.click(checkboxes[0]);
        expect(checkboxes[0]).toBeChecked();
        await user.click(checkboxes[1]);
        expect(checkboxes[1]).toBeChecked();
    })
})