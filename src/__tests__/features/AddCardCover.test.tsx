import React from 'react';
import {render, cleanup, waitFor } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import { cards } from '../../_test_helpers/test_data';

import AddCardCover from '../../features/AddCardCover';
// import * as a from '../../features/AddCardCover'

describe('Add card cover form tests', () => {
  const testCardWithCover = cards[0];
  const testCardWithoutCover = cards[1];

  afterEach(cleanup);
  
  function setup(jsx: any) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    }
  }
  const onClickUpdateCover = jest.fn();
  const setClickAddCover = jest.fn();
  const mockedOnclickUpdate = onClickUpdateCover;

  it('should click and update color cover', async() => {
    // const user = userEvent.setup();
    
    const onClickUpdateCover = jest.fn();
    const setClickAddCover = jest.fn();
    const mockedOnclickUpdate = onClickUpdateCover;
    // const {user} = setup(<AddCardCover card={testCardWithCover} setClickAddCover={setClickAddCover}/>);
    const container = render(<AddCardCover card={testCardWithCover} setClickAddCover={setClickAddCover}/>)
    const divColorEl = document.getElementsByClassName('colorItem') ;
    // console.debug(a[0])
    console.debug(container)
    const divStyle = window.getComputedStyle(divColorEl[0]);
    const updatedTestCardWithCover = {...testCardWithCover};
    mockedOnclickUpdate.mockImplementation(() => {
      updatedTestCardWithCover.cardColor = divStyle.backgroundColor
      return updatedTestCardWithCover
    });

    const divElem = divColorEl[0] as HTMLElement;
    divElem.addEventListener('click', () => {
      mockedOnclickUpdate;
    });
    // divElem.click().mockImplementation(mockedOnclickUpdate);
    // console.debug(divColorEl[0].click.mockImplementation)
    // console.debug(divElem.click.mock)
    // await user.click(divElem);
    // await waitFor(() => expect(updatedTestCardWithCover.cardColor).toBe(divStyle.backgroundColor));
    
    // console.debug(b.backgroundColor)
    // expect(b.backgroundColor).toBe('rgb(255, 179, 179)')
    // const { getByRole } = render(
    //   <AddCardCover card=
    //     <DeleteForm text='test' onClickYes={onClickYes} onClickNo={onClickNo}/>
    // );

    // const buttonYes = getByRole('button', {name: 'Yes'});
    // expect(onClickYes).toHaveBeenCalledTimes(0);
    // await user.click(buttonYes);
    // expect(onClickYes).toHaveBeenCalledTimes(1);
    
    // const buttonNo = getByRole('button', {name: 'No'});
    // expect(onClickNo).toHaveBeenCalledTimes(0);
    // await user.click(buttonNo);
    // expect(onClickNo).toHaveBeenCalledTimes(1);
})

})

