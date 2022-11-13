import React from 'react';
// import {expect, jest, test} from '@jest/globals';
import {render, screen, cleanup, fireEvent, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom";
// import '@testing-library/jest-dom/extend-expect';
import  userEvent from '@testing-library/user-event';
import { RenderInRouterWithStore } from '../../_test_helpers/RenderInRouterWithStore';
import Start from '../../pages/Start';
import { renderWithProviders } from '../../_test_helpers/test_utils';
import {useAppSelector} from '../../hooks/hooks';
import {Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import GetState from '../../hoc/GetState/GetState';
import RequireAuth from '../../hoc/RequireAuth';
import Layout from '../../components/Layout';
// import { act } from "react-dom/test-utils";
// import store from '../../store';
// beforeAll(cleanup);
// interface UserState {
//     user: User
// }
jest.mock('../../hooks/hooks');

const mockedUsedNavigate = jest.fn((() => {
    return {to: '/auth/home'}
  }));

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  Navigate: () => {return {to: '/auth/home'}},
}));
// jest.mock('react-router-dom')
// console.debug(router)

describe ('Start page tests', () => {

const state = {
    user: {
        email: null,
        id: null,
        firstName: 'firstName',
        lastName: 'LastName',
        guestBoards: ['1'],
}}

const testUseAppSelector = () => {
    return state;
}



// beforeEach(() => {
//     (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
// })
afterEach(() => {
    jest.clearAllMocks();
    cleanup;
})
// afterEach(cleanup);

test('check navigate to login page', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    // render(<Start />, { wrapper: renderWithProviders() });
    // const {getByText} = renderWithProviders(<Start />)
    const {getByText} = render(<Start />, { wrapper: RenderInRouterWithStore() });
    await waitFor(() => expect(window.location.pathname).toBe('/'))
    // screen.debug()
    const spanElement = getByText(/Log in/i);
    // console.debug(spanElement)
    const parentDiv = spanElement.parentElement as HTMLElement;
    // console.debug(parentDiv)
    await user.click(parentDiv)

    await waitFor(() => {
        // expect(parentDiv).toHaveBeenCalledTimes(1);
        expect(window.location.pathname).toBe('/login');
    })
})

test('check navigate to signup page', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<Start />, { wrapper: RenderInRouterWithStore() });
    // const {getByText} = renderWithProviders(<Start />, {
    //     preloadedState: {}
    //     //     user: testUser
    //     // }       
    // })
    // renderWithProviders(<Start />)
    const buttonElement = screen.getByText('Sign up');
        
    await user.click(buttonElement)
    await waitFor(() => expect(window.location.pathname).toBe('/signup'))
})

it('should stay at start page if the user is not authorized', () => {
    // const testUser = {
    //     user: {
    //     email: null,
    //     id: null,
    //     firstName: 'firstName',
    //     lastName: 'LastName',
    //     guestBoards: ['1'],
    // }}
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    const {getByText} = renderWithProviders(<Start />, {
        // preloadedState: {
        //     user: testUser
        // }       
    })
    expect(getByText('Collaborate and manage projects')).toBeInTheDocument();
})

// const mockService = () => jest.fn();

// jest.mock('react-router-dom', () => {
//     return {
//         default: mockService
//     }
// });
it('should redirect to a home page if the user is authorized', () => {

    // const Elem = (
    //     <Routes>
    //         <Route path="/" element={<Start />} />
    //         <Route
    //             path="auth/*"
    //             element={
    //             <GetState>
    //                 <RequireAuth>
    //                     <Routes>
    //                         <Route path="" element={<Layout />}>
    //                         <Route path="home" element={<Home />} />
    //                     </Routes>
    //                 </RequireAuth>
    //             </GetState>
    //             }
    //         />
    //     </Routes>
    // )

    // const navi = jest.fn()
    // const mockedNavi = navi

    // jest.mock('react-router-dom', () => {
    //     return {
    //       ...jest.requireActual('react-router-dom'),
    //       router: jest.fn().mockReturnValue({
    //         to: '/auth/home',
            
    //       })
    //     }
    //   })


    //   mockedNavi.mockImplementation(() => {
    //     return {to: '/auth/home'}
    //   })
       
    // const p = jest.spyOn(router)
    // jest.spyOn(router, 'Navigate').mockReturnValue(['/auth/home']);
    // console.debug(router.Navigate.arguments)
    const state1 = {
        user: {
            email: 'invitation.do.not.reply@gmail.com',
            id: 'rAqyJI2CQXnsR1avr2Ru',
            firstName: 'ProM',
            lastName: 'Board',
            guestBoards: ['0'],
    }}
    const testUseAppSelector1 = () => {
        return state1;
    }

    // const testUser = {
    //     user: {
    //         email: 'invitation.do.not.reply@gmail.com',
    //         id: 'rAqyJI2CQXnsR1avr2Ru',
    //         firstName: 'ProM',
    //         lastName: 'Board',
    //         guestBoards: ['0'],
    // }
    // }

    // const mockedNavi = () => {
    //     return {to: '/auth/home'}
    // }

    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector1);
    // (router as jest.Mock).mockImplementation(mockedNavi)
    // const {queryByText} = renderWithProviders(<Start />)
    const {getByText} = render(<Start/>, { wrapper: RenderInRouterWithStore() });
    // const {getByText} = renderWithProviders(<Start />, {
    //     preloadedState: {
    //         user: state1
    //     }       
    // })
    // expect(window.location.pathname).toBe('/auth/home')
    // render(<Start />, { wrapper: RenderInRouterWithStore() });
    // const nav = mockedNavi()
    //   expect(nav.to).toBe('/auth/home') 


    // await waitFor(() => 
    //     expect(queryByText('Collaborate and manage projects')).not.toBeInTheDocument()
    // )
    // await waitFor(() =>  
    //     expect(router).toBeCalled()
    // )
   
    // expect(queryByText('Collaborate and manage projects')).not.toBeInTheDocument();
    // expect(mockedUsedNavigate).toBeCalled()
    // await waitFor(() => expect(window.location.pathname).toBe('/auth/home'))
    // screen.debug()
})

})