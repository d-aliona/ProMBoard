import React from 'react';
// import {expect, jest, test} from '@jest/globals';
import {render, screen, cleanup, fireEvent, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom";
// import '@testing-library/jest-dom/extend-expect';
import  userEvent from '@testing-library/user-event';
import { RenderInRouterWithStore } from '../../_test_helpers/RenderInRouterWithStore';
import Start from '../../pages/Start';
import { renderWithProviders } from '../../_test_helpers/test_utils';
import {useAppSelector} from '../../hooks/hooks';

interface FooContext {
    bar: number;
  }
  const useFooContext = jest.fn();
  const mockedUseFooContext = useFooContext;

  const navi = jest.fn()
  const mockedNavi = navi

  mockedNavi.mockImplementation(() => {
    return {to: '/auth/home'}
  })
  const nav = mockedNavi()
  expect(nav.to).toBe('/auth/home')

    test("sample test", () => {
        mockedUseFooContext.mockImplementation(() => {
            return {bar: 123};
          });
        
        const context = mockedUseFooContext();
        expect(context.bar).toBe(123);
      });
