import React from 'react';
import {render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect';
import  userEvent from '@testing-library/user-event';
import {useAppSelector} from '../../hooks/hooks';
import { RenderInRouterWithStore } from '../../_test_helpers/RenderInRouterWithStore';
import { lists } from '../../_test_helpers/test_data';
import AddListForm from '../../features/AddListForm';

jest.mock('../../hooks/hooks');

describe('Add list form tests', () => {
    const state = lists;
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
    render(<AddListForm title='Add a list' curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a list/i);
    expect(btn).toBeInTheDocument();
    await user.click(btn);
    expect(screen.queryByText(/add a list/i)).not.toBeInTheDocument();
  })

  it('should render a form after clicking a button and input text into textfield', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddListForm title='Add a list' curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a list/i);
    await user.click(btn);
    const btnConfirmAddList = await screen.findByRole('button', {name: 'Add list'});
    expect(btnConfirmAddList).toBeInTheDocument();
    
    const input = screen.getByRole('textbox');
    expect(input.textContent).toBe('');
    await user.type(input, 'Test');
    const inputChanged = await screen.findByRole("textbox");
    expect((inputChanged as HTMLInputElement).value).toBe('Test')
  })

  it('checks if add list button is disabled initially in the form', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddListForm title='Add a list' curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a list/i);
    await user.click(btn);
    const btnConfirmAddList = screen.getByRole('button', {name: 'Add list'});
    
    expect(btnConfirmAddList.getAttribute('class')).toMatch(/disabled/gi);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Test');
    expect(btnConfirmAddList.getAttribute('class')).not.toMatch(/disabled/gi);
  })

  it('checks if initial add list button renders after form has been submitted', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddListForm title='Add a list' curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a list/i);
    await user.click(btn);
    const btnConfirmAddList = screen.getByRole('button', {name: 'Add list'});
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Test');
    await user.click(btnConfirmAddList);
    
    const initialBtn = await screen.findByText(/add a list/i);
    expect(initialBtn).toBeInTheDocument();
  })
  
  it('checks if initial add card button renders after close button has been clicked', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddListForm title='Add a list' curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a list/i);
    await user.click(btn);
    const closeBtn = screen.getByRole('button', {name: '×'});
    await user.click(closeBtn);
    
    const initialBtn = await screen.findByText(/add a list/i);
    expect(initialBtn).toBeInTheDocument();
  })

  it('should check if message appear when list title is duplicated', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<AddListForm title='Add a list' curBoardId='bid11'/>, { wrapper: RenderInRouterWithStore() })
    const btn = screen.getByText(/add a list/i);
    await user.click(btn);

    const btnConfirmAddList = screen.getByRole('button', {name: 'Add list'});
    const input = screen.getByRole('textbox');
    await user.type(input, 'l1');
    await user.click(btnConfirmAddList);
    
    const messageDiv = await screen.findByText('The list with such a title already exists. Please enter another title.');
    expect(messageDiv).toBeInTheDocument();
  })
})