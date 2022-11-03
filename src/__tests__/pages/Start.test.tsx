import React from 'react';
import {render, screen, cleanup, fireEvent, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom";
// import { createMemoryHistory } from 'history';
// import {useNavigate} from 'react-router-dom';
   
import  userEvent from '@testing-library/user-event';
import { RenderInRouterWithStore } from '../../_test_helpers/RenderInRouterWithStore';
import Start from '../../pages/Start';

afterEach(cleanup);

// const realLocation = window.location;

// beforeEach(() => {
//   window.location = realLocation;
// });

// afterEach(() => {
//   delete (window as any).location;
// });


test('check navigate to login page', async() => {
    // const navigate = useNavigate();
    // navigate('/')
    // const testUser = {
    //     email: null,
    //     id: null,
    //     firstName: 'firstName',
    //     lastName: 'LastName',
    //     guestBoards: ['1'],
    // }
    
    const user = userEvent.setup();
    
    render(<Start />, { wrapper: RenderInRouterWithStore() });
    
    await waitFor(() => expect(window.location.pathname).toBe('/'))
    
    const spanElement = screen.getByText('Log in');
    const parentDiv = spanElement.parentElement as HTMLElement;
    
    await user.click(parentDiv)
    await waitFor(() => expect(window.location.pathname).toBe('/login'))
})

test('check navigate to signup page', async() => {
    // window.location = realLocation;
    // navigate('/');

    const user = userEvent.setup();
    // delete (window as any).location;
    render(<Start />, { wrapper: RenderInRouterWithStore() });
    
    // await waitFor(() => expect(window.location.pathname).toBe('/login'))
    
    const buttonElement = screen.getByText('Sign up');
        
    await user.click(buttonElement)
    await waitFor(() => expect(window.location.pathname).toBe('/signup'))
})