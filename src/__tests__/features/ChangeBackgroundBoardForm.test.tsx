import React from 'react';
import {render, cleanup, screen, waitFor, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import  userEvent from '@testing-library/user-event';
import { boards } from '../../_test_helpers/test_data';
import { RenderInRouterWithStore } from '../../_test_helpers/RenderInRouterWithStore';
import ChangeBackgroundBoardForm from '../../features/ChangeBackgroundBoardForm';

describe('Change background board form tests', () => {
    const testBoard = boards[0]; // red background-color
    const setShowChangeBackgroundForm = jest.fn();
    const setShowDropMenu = jest.fn();
    afterEach(() => {
        cleanup;
    })
  
    it('should render a form and handle a closeButton click', async() => {
        const user = userEvent.setup();
        
        render(<ChangeBackgroundBoardForm 
            board={testBoard} 
            setShowChangeBackgroundForm={setShowChangeBackgroundForm} 
            setShowDropMenu={setShowDropMenu}/>, { wrapper: RenderInRouterWithStore() })
        
        const title = screen.getAllByText(/Change background/i)[0];
        expect(title).toBeInTheDocument();

        const closeBtn = screen.getByRole('button', {name: '×'});
        await user.click(closeBtn); 
        expect(setShowChangeBackgroundForm).toHaveBeenCalledTimes(1)
    })

    it('should display red background for the previewImage div', async() => {
        
        render(<ChangeBackgroundBoardForm 
            board={testBoard} 
            setShowChangeBackgroundForm={setShowChangeBackgroundForm} 
            setShowDropMenu={setShowDropMenu}/>, { wrapper: RenderInRouterWithStore() })
        
        const divElPreview = document.getElementsByClassName('previewImage')[0]; 
        expect(divElPreview).toHaveStyle({backgroundColor: 'red'})
    })

    it('should change the background for the previewImage div after clicking on corresponding color', async() => {
        const user = userEvent.setup();

        render(<ChangeBackgroundBoardForm 
            board={testBoard} 
            setShowChangeBackgroundForm={setShowChangeBackgroundForm} 
            setShowDropMenu={setShowDropMenu}/>, { wrapper: RenderInRouterWithStore() })
        
        const divElPreview = document.getElementsByClassName('previewImage')[0]; 
        expect(divElPreview).toHaveStyle({backgroundColor: 'red'})
        const divColorItem = document.getElementsByClassName('colourItem')[0]; //backgroundColor: '#e6a3a3'
        await user.click(divColorItem); 
        expect(divElPreview).toHaveStyle({backgroundColor: '#e6a3a3'})  
    })

    it('should change the background for the previewImage div after color selection', async() => {
        const user = userEvent.setup();

        render(<ChangeBackgroundBoardForm 
            board={testBoard} 
            setShowChangeBackgroundForm={setShowChangeBackgroundForm} 
            setShowDropMenu={setShowDropMenu}/>, { wrapper: RenderInRouterWithStore() })
        
        const divElPreview = document.getElementsByClassName('previewImage')[0]; 
        expect(divElPreview).toHaveStyle({backgroundColor: 'red'});
        const inputDiv = document.getElementsByClassName('inputColor')[0];
        fireEvent.input(inputDiv, {target: {value: '#112233'}})
        expect(divElPreview).toHaveStyle({backgroundColor: '#112233'})
    })
})


