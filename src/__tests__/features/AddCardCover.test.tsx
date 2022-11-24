import React from 'react';
import {render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import  userEvent from '@testing-library/user-event';
import { cards } from '../../_test_helpers/test_data';

import AddCardCover from '../../features/AddCardCover';

describe('Add card cover form tests', () => {
  const testCardWithCover = cards[0];
  const testCardWithoutCover = cards[1];

  afterEach(cleanup);
  
  test.each([0,1,2,3,4,5,6,7])('should removeCover button appear after clicking on div to update color cover', async(i) => {
    const user = userEvent.setup();
    const setClickAddCover = jest.fn();

    render(<AddCardCover card={testCardWithoutCover} setClickAddCover={setClickAddCover}/>)
   
    expect(screen.queryByText(/remove cover/i)).not.toBeInTheDocument();
    const divColorEl = document.getElementsByClassName('colorItem')[i];
    await user.click(divColorEl);
    expect(screen.queryByText(/remove cover/i)).toBeInTheDocument();
  })

  test('should removeCover button dissappear after clicking on it', async() => {
    const user = userEvent.setup();
    const setClickAddCover = jest.fn();

    render(<AddCardCover card={testCardWithCover} setClickAddCover={setClickAddCover}/>)
    
    const divRemoveCover = screen.getByText(/remove cover/i);
    expect(divRemoveCover).toBeInTheDocument();
    
    await user.click(divRemoveCover);
    expect(screen.queryByText(/remove cover/i)).not.toBeInTheDocument();
  })

})

