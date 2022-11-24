import React from 'react';
import {cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import  userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../_test_helpers/test_utils';
import { setAllBoards } from '../../store/slices/allBoardsSlice';
import { setUser } from '../../store/slices/userSlice';
import { setUsers } from '../../store/slices/usersSlice';
import { setupStore } from '../../store'
import { cards, USER, USERS, ALLBOARDS } from '../../_test_helpers/test_data';
import AssignMemberForm from '../../features/AssignMemberForm';

describe('Assign member form tests', () => {
    const testCard = cards[0]; // only one user is assigned to this card and three users are assigned to the current board
    const setClickAddMembers = jest.fn();

    afterEach(() => {
        cleanup;
    })
  
    it('should render a form and handle a closeButton click', async() => {
        const user = userEvent.setup();
        const store = setupStore()
        store.dispatch(setUser(USER.user))
        store.dispatch(setUsers(USERS.users))
        store.dispatch(setAllBoards(ALLBOARDS.allBoards))

        renderWithProviders(<AssignMemberForm card={testCard} setClickAddMembers={setClickAddMembers} />, { store })
        
        const title = screen.getByText(/Assign members/i);
        expect(title).toBeInTheDocument();

        const closeBtn = screen.getByRole('button', {name: '×'});
        await user.click(closeBtn); 
        expect(setClickAddMembers).toHaveBeenCalledTimes(1)
    })

    it('should display and not display a check mark depending on whether the user is assigned or not', async() => {
        const store = setupStore();
        store.dispatch(setUser(USER.user));
        store.dispatch(setUsers(USERS.users));
        store.dispatch(setAllBoards(ALLBOARDS.allBoards));

        renderWithProviders(<AssignMemberForm card={testCard} setClickAddMembers={setClickAddMembers} />, { store })
        
        const divElements = document.getElementsByClassName('memberToAssign'); 
        const divEl1 = divElements[0]; // is assigned to this card
        expect(divEl1.textContent?.includes('✓')).toBeTruthy();
        const divEl2 = divElements[1]; // is not assigned to this card
        expect(divEl2.textContent?.includes('✓')).toBeFalsy();
    })
})


