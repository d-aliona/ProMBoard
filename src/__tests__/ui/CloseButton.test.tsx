import React from 'react';
import {render } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';

import CloseButton from '../../ui/CloseButton';

test('click close button', async() => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    
    const { getByRole } = render(
        <CloseButton onClick={onClick} />
    );

    const button = getByRole('button');
    expect(onClick).toHaveBeenCalledTimes(0);
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
})