import React from 'react';
import {render } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';

import DeleteForm from '../../ui/DeleteForm';

test('click buttons yes and no', async() => {
    const user = userEvent.setup();
    const onClickYes = jest.fn();
    const onClickNo = jest.fn();

    const { getByRole } = render(
        <DeleteForm text='test' onClickYes={onClickYes} onClickNo={onClickNo}/>
    );

    const buttonYes = getByRole('button', {name: 'Yes'});
    expect(onClickYes).toHaveBeenCalledTimes(0);
    await user.click(buttonYes);
    expect(onClickYes).toHaveBeenCalledTimes(1);
    
    const buttonNo = getByRole('button', {name: 'No'});
    expect(onClickNo).toHaveBeenCalledTimes(0);
    await user.click(buttonNo);
    expect(onClickNo).toHaveBeenCalledTimes(1);
})