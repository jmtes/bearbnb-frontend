import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { action } from '@storybook/addon-actions';

import User from './User';

export const storeNotLoggedIn = {
  getState: () => ({
    auth: {
      isLoggedIn: false,
      user: null
    }
  }),
  subscribe: () => 0,
  dispatch: action('dispatch')
};

export const storeLoggedIn = {
  getState: () => ({
    auth: {
      isLoggedIn: true,
      user: {
        avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
        name: 'Natalie'
      }
    }
  }),
  subscribe: () => 0,
  dispatch: action('dispatch')
};

export default {
  title: 'User',
  component: User,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
  parameters: {
    docs: {
      description: {
        component:
          'Header subcomponent that displays logged-in user and expands user menu on click'
      }
    }
  },
  argTypes: {
    isLoggedIn: {
      description: 'Whether or not the user is logged in'
    },
    user: {
      description:
        "Object containing logged-in user info. `avatar` is the URL of the user's profile picture. `name` is the user's first name."
    }
  }
};

const Template = (args) => <User {...args} />;

export const NotLoggedIn = Template.bind({});
NotLoggedIn.decorators = [
  (Story) => (
    <Provider store={storeNotLoggedIn}>
      <Story />
    </Provider>
  )
];

export const LoggedIn = Template.bind({});
LoggedIn.decorators = [
  (Story) => (
    <Provider store={storeLoggedIn}>
      <Story />
    </Provider>
  )
];
