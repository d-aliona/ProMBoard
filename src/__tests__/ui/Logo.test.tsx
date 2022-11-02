import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import "@testing-library/jest-dom";
import Logo from '../../ui/Logo';

afterEach(cleanup);

it('renders logo with text', () => {
  render(<Logo />);
  const divEl = screen.getByText(/promboard/i);
  expect(divEl).toBeInTheDocument();
})

it('renders logo without text', () => {
  const { queryByTestId } = render(<Logo hideText={true}/>);

  expect(queryByTestId('div-logo')).not.toBeVisible();
})