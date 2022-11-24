import React from 'react';
import {render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect';
import  userEvent from '@testing-library/user-event';
import {useAppSelector} from '../../hooks/hooks';
import { RenderInRouterWithStore } from '../../_test_helpers/RenderInRouterWithStore';
import { lists, cards } from '../../_test_helpers/test_data';
import AddCardForm from '../../features/AddCardForm';

jest.mock('../../hooks/hooks');

describe('Add card form tests', () => {
    const testList = lists[0];

    const state = cards
    const testUseAppSelector = () => {
        return state;
    }
    
    afterEach(() => {
        jest.clearAllMocks();
        cleanup;
    })
  
  it('should render a button to add a form and handle a click', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddCardForm list={testList} curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a card/i);
    expect(btn).toBeInTheDocument();
    await user.click(btn);
    expect(screen.queryByText(/add a card/i)).not.toBeInTheDocument();
  })

  it('should render a form after clicking a button and input text into textfield', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddCardForm list={testList} curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a card/i);
    await user.click(btn);
    const btnConfirmAddCard = await screen.findByRole('button', {name: 'Add card'});
    expect(btnConfirmAddCard).toBeInTheDocument();
    
    const input = screen.getByRole('textbox');
    expect(input.textContent).toBe('');
    await user.type(input, 'Test');
    const inputChanged = await screen.findByRole("textbox");
    expect((inputChanged as HTMLInputElement).value).toBe('Test')
  })

  it('checks if add card button is disabled initially in the form', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddCardForm list={testList} curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a card/i);
    await user.click(btn);
    const btnConfirmAddCard = screen.getByRole('button', {name: 'Add card'});
    
    expect(btnConfirmAddCard.getAttribute('class')).toMatch(/disabled/gi);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Test');
    expect(btnConfirmAddCard.getAttribute('class')).not.toMatch(/disabled/gi);
  })

  it('checks if initial add card button renders after form has been submitted', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddCardForm list={testList} curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a card/i);
    await user.click(btn);
    const btnConfirmAddCard = screen.getByRole('button', {name: 'Add card'});
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Test');
    await user.click(btnConfirmAddCard);
    const initialBtn = await screen.findByText(/add a card/i);
    expect(initialBtn).toBeInTheDocument();
  })
  
  it('checks if initial add card button renders after close button has been clicked', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddCardForm list={testList} curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a card/i);
    await user.click(btn);
    const closeBtn = screen.getByRole('button', {name: '×'});
    await user.click(closeBtn);
    const initialBtn = await screen.findByText(/add a card/i);
    expect(initialBtn).toBeInTheDocument();
  })
})