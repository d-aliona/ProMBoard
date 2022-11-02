import React from 'react';
import {render, screen} from '@testing-library/react';
import "@testing-library/jest-dom";
import { createMemoryHistory } from 'history';
import Start from '../../pages/Start';
import Initials from '../../ui/Initials';

test('check clicks', () => {
    const testUser = {
        email: null,
        id: null,
        firstName: 'firstName',
        lastName: 'LastName',
        guestBoards: ['1'],
    }

    render(<Start />)

    expect(screen.getByText('fL')).toBeInTheDocument;
})