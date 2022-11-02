import React from 'react';
import {render, screen, cleanup } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";

import Button from '../../ui/Button';

afterEach(cleanup);

function setup(jsx: any) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    }
  }
  
test('click button', async () => {
    const onClick = jest.fn();
    const {user} = setup(<Button title='test' onClick={onClick}/>)

    const button = screen.getByRole('button');
    expect(onClick).toHaveBeenCalledTimes(0);
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
})

test('check if hover effect works', async() => {
    const onClick = jest.fn();
    const {user} = setup(<Button title='test' back='blue' hover='red' onClick={onClick}/>)

    const button = screen.getByRole('button');
    expect(button).toHaveStyle('backgroundColor: blue');
    expect(button).toHaveStyle('color: red');
    
    await user.hover(button);
    expect(button).toHaveStyle('backgroundColor: red');
    expect(button).toHaveStyle('color: white');

    await user.unhover(button);
    expect(button).toHaveStyle('backgroundColor: blue');
    expect(button).toHaveStyle('color: red');
})
