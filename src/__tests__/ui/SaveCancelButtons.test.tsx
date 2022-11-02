import React from 'react';
import {render } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";

import SaveCancelButtons from '../../ui/SaveCancelButtons';

test('click buttons save and cancel', async() => {
    const user = userEvent.setup();
    const onClickSave = jest.fn();
    const onClickCancel = jest.fn();

    const { getByRole } = render(
        <SaveCancelButtons  onClickSave={onClickSave} onClickCancel={onClickCancel}/>
    );

    const buttonSave = getByRole('button', {name: 'Save'});
    expect(onClickSave).toHaveBeenCalledTimes(0);
    await user.click(buttonSave);
    expect(onClickSave).toHaveBeenCalledTimes(1);
    
    const buttonCancel = getByRole('button', {name: 'Cancel'});
    expect(onClickCancel).toHaveBeenCalledTimes(0);
    await user.click(buttonCancel);
    expect(onClickCancel).toHaveBeenCalledTimes(1);

    expect(buttonSave).not.toBeDisabled();
})

test('checks if save button is disabled', () => {
    const user = userEvent.setup();
    const onClickSave = jest.fn();
    const onClickCancel = jest.fn();

    const { getByRole } = render(
        <SaveCancelButtons isDisabled={true} onClickSave={onClickSave} onClickCancel={onClickCancel}/>
    );

    expect(getByRole('button', {name: 'Save'})).toBeDisabled();
})