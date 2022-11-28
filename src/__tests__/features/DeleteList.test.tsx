import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { setupStore } from '../../store'
import { setPersonalBoards } from '../../store/slices/personalBoardsSlice';
import { setUser } from '../../store/slices/userSlice';
import { USER, PERSONALBOARDS, CURRENTLISTS, lists, cards } from '../../_test_helpers/test_data';
import { renderWithProviders } from '../../_test_helpers/test_utils';
import DeleteList from '../../features/DeleteList';
import { setCurrentLists } from '../../store/slices/currentListsSlice';

jest.mock('../../hooks/hooks');

describe('Delete list form tests', () => {
  const testList = lists[0];
  const setMessageDeleteList = jest.fn();
  const setShowMenu = jest.fn();

  afterEach(() => {
      jest.clearAllMocks();
      cleanup;
  })
  
  it('should render a form with no cards in the list', async() => {
    const testCardsOnCurList: Cards = []; // there are no cards in the list
    const store = setupStore();
    store.dispatch(setUser(USER.user));
    store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
    store.dispatch(setCurrentLists(CURRENTLISTS.currentLists));

    renderWithProviders(<DeleteList 
      list={testList}
      cardsOnCurList={testCardsOnCurList}
      setMessageDeleteList={setMessageDeleteList} 
      setShowMenu={setShowMenu}/>, { store })
    
    expect(screen.getByText('Delete this list?')).toBeInTheDocument();
  })

  it('should render a form with cards in the list', async() => {
    const testCardsOnCurList = cards; // there are cards in the list
    const store = setupStore();
    store.dispatch(setUser(USER.user));
    store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
    store.dispatch(setCurrentLists(CURRENTLISTS.currentLists));

    renderWithProviders(<DeleteList 
      list={testList}
      cardsOnCurList={testCardsOnCurList}
      setMessageDeleteList={setMessageDeleteList} 
      setShowMenu={setShowMenu}/>, { store })
    
    expect(screen.getByText('Delete this list with all cards on it?')).toBeInTheDocument();
  })
})