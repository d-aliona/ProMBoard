import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import  userEvent from '@testing-library/user-event';
import { setupStore } from '../../store'
import { setPersonalBoards } from '../../store/slices/personalBoardsSlice';
import { setUser } from '../../store/slices/userSlice';
import { USER, PERSONALBOARDS } from '../../_test_helpers/test_data';
import { renderWithProviders } from '../../_test_helpers/test_utils';
import CreateBoardForm from '../../features/CreateBoardForm';

describe('Create board form tests', () => {
    const setShowCreateBoardForm = jest.fn();
    
    afterEach(() => {
        cleanup;
    })
  
    it('should render a form and handle a closeButton click', async() => {
        const user = userEvent.setup();
        const store = setupStore();
        store.dispatch(setUser(USER.user));
        store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
        renderWithProviders(<CreateBoardForm 
            setShowCreateBoardForm={setShowCreateBoardForm} />, { store })
        
        const title = screen.getByText(/Create a board/i);
        expect(title).toBeInTheDocument();

        const closeBtn = screen.getByRole('button', {name: '×'});
        await user.click(closeBtn); 
        expect(setShowCreateBoardForm).toHaveBeenCalledTimes(1);
    })

    it('should change the background for the previewImage div after clicking on corresponding color', async() => {
        const user = userEvent.setup();
        const store = setupStore();
        store.dispatch(setUser(USER.user));
        store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
        renderWithProviders(<CreateBoardForm 
            setShowCreateBoardForm={setShowCreateBoardForm} />, { store })
        
        const divElPreview = document.getElementsByClassName('previewImage')[0]; 
        expect(divElPreview).toHaveStyle({backgroundColor: '#e6a3a3'}); //initial backgroundColor: '#e6a3a3'
        const divColorItem = document.getElementsByClassName('colourItem')[2]; // backgroundColor: '#c1ddec'
        await user.click(divColorItem); 
        expect(divElPreview).toHaveStyle({backgroundColor: '#c1ddec'})  
    })

    it('should change the background for the previewImage div after color selection', async() => {
        const user = userEvent.setup();
        const store = setupStore();
        store.dispatch(setUser(USER.user));
        store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
        renderWithProviders(<CreateBoardForm 
            setShowCreateBoardForm={setShowCreateBoardForm} />, { store })
        
        const divElPreview = document.getElementsByClassName('previewImage')[0]; 
        expect(divElPreview).toHaveStyle({backgroundColor: '#e6a3a3'});
        const inputDiv = document.getElementsByClassName('inputColor')[0];
        fireEvent.input(inputDiv, {target: {value: '#112233'}})
        expect(divElPreview).toHaveStyle({backgroundColor: '#112233'})
    })

    it('should the createButton be disabled initially', async() => {
        const user = userEvent.setup();
        const store = setupStore();
        store.dispatch(setUser(USER.user));
        store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
        renderWithProviders(<CreateBoardForm 
            setShowCreateBoardForm={setShowCreateBoardForm} />, { store })
        
        const btn = screen.getByText('Create');
        expect(btn).toBeInTheDocument();
        expect(btn.getAttribute('class')).toMatch(/disabled/gi);
    
        const input = screen.getByPlaceholderText('Enter board title');
        await user.type(input, 'test');
        expect(btn.getAttribute('class')).not.toMatch(/disabled/gi);    
    })

    it('should check if message appear when board title is duplicated', async() => {
        const user = userEvent.setup();
        const store = setupStore();
        store.dispatch(setUser(USER.user));
        store.dispatch(setPersonalBoards(PERSONALBOARDS.personalBoards));
        renderWithProviders(<CreateBoardForm 
            setShowCreateBoardForm={setShowCreateBoardForm} />, { store })
        
        const input = screen.getByPlaceholderText('Enter board title');
        await user.type(input, 'b1');  //such a board title already exists   
        const btn = screen.getByText('Create');
        await user.click(btn);
        expect(screen
            .getByText('The board with such a title already exists. Please enter another title.'))
            .toBeInTheDocument();
    })
})


