import React from 'react';
import {render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import  userEvent from '@testing-library/user-event';
import ChangePasswordForm from '../../features/ChangePasswordForm';

import { auth } from '../../firebase-client';

  jest.mock('../../firebase-client', () => {
    return {
      auth: jest.fn(),
    };
  });

describe('Change password form tests', () => {
    const setShowChangePassForm = jest.fn();

    (auth as jest.Mocked<any>).mockReturnValueOnce({
        currentUser: { email: 'aaa@aaa.aa' },
      });

    afterEach(() => {
        cleanup;
    })
  
    it('should render a form and changePasswrd button should be disabled initially', async() => {
        const user = userEvent.setup();           
        render(<ChangePasswordForm 
            setShowChangePassForm={setShowChangePassForm}/>)
        
        const button = screen.getByRole('button', {name: 'Change password'});
        expect(button).toBeInTheDocument();
        expect(button.getAttribute('class')).toMatch(/disabled/gi);
    
        const inputCurrPass = screen.getByPlaceholderText('Enter your current password');
        const inputNewPass = screen.getByPlaceholderText('Enter your new password');
        const inputConfNewPass = screen.getByPlaceholderText('Confirm your new password');
        await user.type(inputCurrPass, 'pass');
        await user.type(inputNewPass, 'new pass');
        await user.type(inputConfNewPass, 'new pass');
        
        expect(button.getAttribute('class')).not.toMatch(/disabled/gi);
    })

    it('should change the input type from password to text after clicking on eye sign', async() => {
        const user = userEvent.setup();      
        render(<ChangePasswordForm 
            setShowChangePassForm={setShowChangePassForm}/>)

        const inputCurrPass = screen.getByPlaceholderText('Enter your current password');
        expect(inputCurrPass).toHaveAttribute('type', 'password');
        const eyeSign = document.getElementsByClassName('eye')[0];
        await user.click(eyeSign);
        expect(inputCurrPass).toHaveAttribute('type', 'text');
    })
})
