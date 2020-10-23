import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import { GlobalStyle } from './shared/global';
import User from './components/User/User';

var mountNode = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <MemoryRouter>
      <GlobalStyle />
      <User />
    </MemoryRouter>
  </Provider>,
  mountNode
);
