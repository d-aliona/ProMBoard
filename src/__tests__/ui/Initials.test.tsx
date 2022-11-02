import React from 'react';
import {render, screen} from '@testing-library/react';
import "@testing-library/jest-dom";

import Initials from '../../ui/Initials';

test('displays the user initials', () => {
    const testUser = {
        email: null,
        id: null,
        firstName: 'firstName',
        lastName: 'LastName',
        guestBoards: ['1'],
    }

    render(<Initials user={testUser}/>)
    expect(screen.getByText('fL')).toBeInTheDocument();
})