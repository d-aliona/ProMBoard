import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../store';

export const RenderInRouterWithStore = () => ({ children }: any) => (
  <BrowserRouter >
      <Provider store={store}>
        {children}
      </Provider>
  </BrowserRouter>
);
