import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { setupStore } from '../../store'
import { setUser } from '../../store/slices/userSlice';
import { USER, boards } from '../../_test_helpers/test_data';
import { renderWithProviders } from '../../_test_helpers/test_utils';
import DropBoardMenu from '../../features/DropBoardMenu';

jest.mock('../../hooks/hooks');

describe('Drop board menu tests', () => {
  const setShowDropMenu = jest.fn();
  const setClickBoardTitle = jest.fn();
  afterEach(() => {
      jest.clearAllMocks();
      cleanup;
  })
  
  it('should render a menu and check if it is a guest board with only one menu item', () => {
    const store = setupStore();
    store.dispatch(setUser(USER.user));
    const testBoard = boards[0]; // it is a guest board board.owner !== user.id;
    console.debug(USER.user)
    console.debug(testBoard.owner)
    console.debug(testBoard.owner !== USER.user.id)
    renderWithProviders(<DropBoardMenu 
      board={testBoard}
      setShowDropMenu={setShowDropMenu}
      setClickBoardTitle={setClickBoardTitle} isOnBoards={false}
       />, { store })
    // const up = store.getState().user.user;
    // console.debug(up)
    screen.debug()
    expect(screen.getByText('View members')).toBeInTheDocument();
    expect(screen.queryByText('Invite members')).not.toBeInTheDocument();
  })

  it('should render a menu and check if it is a personal board with five menu items', async() => {
    const store = setupStore();
    store.dispatch(setUser(USER.user));
    const testBoard = boards[3]; // it is a personal board board.owner === user.id;
    
    console.debug(USER.user)
    console.debug(testBoard.owner)
    console.debug(testBoard.owner !== USER.user.id)
    renderWithProviders(<DropBoardMenu 
      board={testBoard}
      setShowDropMenu={setShowDropMenu}
      setClickBoardTitle={setClickBoardTitle} />, { store })
    
    screen.debug();
    expect(screen.getByText('View members')).toBeInTheDocument();
    expect(screen.getByText('Invite members')).toBeInTheDocument();
  })
  
})