import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import { GlobalStyle } from './shared/global';
import User from './components/User/User';

var mountNode = document.getElementById('root');
ReactDOM.render(
  <MemoryRouter>
    <GlobalStyle />
    <User />
  </MemoryRouter>,
  mountNode
);
