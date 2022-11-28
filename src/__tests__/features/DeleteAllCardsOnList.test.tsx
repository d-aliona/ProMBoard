import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { setupStore } from '../../store'
import { setPersonalBoards } from '../../store/slices/personalBoardsSlice';
import { setUser } from '../../store/slices/userSlice';
import { USER, PERSONALBOARDS, lists, cards } from '../../_test_helpers/test_data';
import { renderWithProviders } from '../../_test_helpers/test_utils';
import DeleteAllCardsOnList from '../../features/DeleteAllCardsOnList';

jest.mock('../../hooks/hooks');

describe('Delete all cards on list form tests', () => {
  const testList = lists[0];
  const testCardsOnCurList = cards;
  const setMessageDeleteAllCards = jest.fn();
  const setShowMenu = jest.fn();

  afterEach(() => {
      jest.clearAllMocks();
      cleanup;
  })
  
  it('should render a form', async() => {
    const store = setupStore();
    store.dispatch(setUser(USER.user));
    store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
    
    renderWithProviders(<DeleteAllCardsOnList 
      list={testList}
      cardsOnCurList={testCardsOnCurList}
      setMessageDeleteAllCards={setMessageDeleteAllCards} 
      setShowMenu={setShowMenu}/>, { store })
    
    expect(screen.getByText('Delete all cards on this list?')).toBeInTheDocument();
  })
})