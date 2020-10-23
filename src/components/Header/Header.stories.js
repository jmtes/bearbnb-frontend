import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';
import { storeNotLoggedIn } from '../../../mocks/storeMock';

export default {
  title: 'Header',
  component: Header,
  decorators: [
    (story) => (
      <Provider store={storeNotLoggedIn}>
        <MemoryRouter>{story()}</MemoryRouter>
      </Provider>
    )
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Header bar found at the top of each page, containing the Bearbnb logo and the user menu'
      }
    }
  }
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
