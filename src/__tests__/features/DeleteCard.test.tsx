import React from 'react';
import {render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect';
import  userEvent from '@testing-library/user-event';
import {useAppSelector} from '../../hooks/hooks';
import { RenderInRouterWithStore } from '../../_test_helpers/RenderInRouterWithStore';
import { cards } from '../../_test_helpers/test_data';
import DeleteCard from '../../features/DeleteCard';

jest.mock('../../hooks/hooks');

describe('Delete card form tests', () => {
    const testCard = cards[0];
    const setClickDelete = jest.fn();
    const state = cards
    const testUseAppSelector = () => {
        return state;
    }
    
    afterEach(() => {
        jest.clearAllMocks();
        cleanup;
    })
  
  it('should render a form', async() => {
    const user = userEvent.setup();
    (useAppSelector as jest.Mock).mockImplementation(testUseAppSelector);
    render(<DeleteCard card={testCard} setClickDelete={setClickDelete}/>, { wrapper: RenderInRouterWithStore() })
    expect(screen.getByText('Delete this card?')).toBeInTheDocument();
  })
})