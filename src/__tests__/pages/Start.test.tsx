import React from 'react';
import {render, screen, cleanup, fireEvent, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom";

import  userEvent from '@testing-library/user-event';
import { RenderInRouterWithStore } from '../../_test_helpers/RenderInRouterWithStore';
import Start from '../../pages/Start';
import { renderWithProviders } from '../../_test_helpers/test_utils';

afterEach(cleanup);

test('check navigate to login page', async() => {
    const user = userEvent.setup();
    
    render(<Start />, { wrapper: RenderInRouterWithStore() });
    
    await waitFor(() => expect(window.location.pathname).toBe('/'))
    
    const spanElement = screen.getByText('Log in');
    const parentDiv = spanElement.parentElement as HTMLElement;
    
    user.click(parentDiv)
    await waitFor(() => {
        expect(window.location.pathname).toBe('/login');
        screen.debug();
    })
    
})

test('check navigate to signup page', async() => {
    const user = userEvent.setup();
    render(<Start />, { wrapper: RenderInRouterWithStore() });
    
    const buttonElement = screen.getByText('Sign up');
        
    await user.click(buttonElement)
    await waitFor(() => expect(window.location.pathname).toBe('/signup'))
})

it('should stay at start page if the user is not authorized', () => {
    const testUser = {
        user: {
        email: null,
        id: null,
        firstName: 'firstName',
        lastName: 'LastName',
        guestBoards: ['1'],
    }}

    const {getByText} = renderWithProviders(<Start />, {
        preloadedState: {
            user: testUser
        }
    })
    expect(getByText('Collaborate and manage projects')).toBeInTheDocument();
})

// it('should redirect to a home page if the user is authorized', async() => {
//     const testUser = {
//         user: {
//         email: 'test@test.test',
//         id: 'test',
//         firstName: 'ProM',
//         lastName: 'Board',
//         guestBoards: ['1'],
//     }}

//     const {getByText} = renderWithProviders(<Start />, {
//         preloadedState: {
//             user: testUser
//         }
//     })
//     // screen.debug()
//     expect(getByText('Collaborate and manage projects')).toBeInTheDocument();
//     // await waitFor(() => expect(window.location.pathname).toBe('/auth/home'))
//     // screen.debug()
// })