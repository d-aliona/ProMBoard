import React from 'react';
import {render, screen, cleanup } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";

import ShortenTitle from '../../ui/ShortenTitle';

afterEach(cleanup);

function setup(jsx: any) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    }
  }
  
test('display title without shortening and without hint', async() => {
    const {user} = setup(<ShortenTitle title='abcde' number={10}/>);
    const textEl = screen.getByText('abcde');
    expect(textEl).toBeInTheDocument();

    await user.hover(textEl);
    const hintDiv = screen.getByText((content, el) => {
        return el?.tagName.toLowerCase() === 'div' && content === 'abcde'
    })
    expect(hintDiv).not.toHaveClass('style.hint');
})

test('display title with shortening and with hint', async() => {
    const {user} = setup(<ShortenTitle title='abcde' number={3}/>);
    const textEl = screen.getByText('ab...');
    expect(textEl).toBeInTheDocument();

    await user.hover(textEl);
    const hintDiv = screen.getByText((content, el) => {
        return el?.tagName.toLowerCase() === 'div' && content === 'abcde'
    })
    expect(hintDiv).toHaveClass('hint');
    expect(screen.queryByText('abcde')).toBeInTheDocument();

    await user.unhover(textEl);
    expect(screen.queryByText('abcde')).not.toBeInTheDocument();
})

test('display only hint', async() => {
    const {user} = setup(<ShortenTitle title='+ abcde' number={1} showOnlyHint={true}/>);
    const textEl = screen.getByText('+');
    expect(textEl).toBeInTheDocument();

    await user.hover(textEl);
    const hintDiv = screen.getByText((content, el) => {
        return el?.tagName.toLowerCase() === 'div' && content === 'abcde'
    })
    expect(hintDiv).toHaveClass('hint');
    expect(screen.queryByText('abcde')).toBeInTheDocument();

    await user.unhover(textEl);
    expect(screen.queryByText('abcde')).not.toBeInTheDocument();
})
