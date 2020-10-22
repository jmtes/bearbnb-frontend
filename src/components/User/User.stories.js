import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import User from './User';

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
NotLoggedIn.args = {
  ...User.defaultProps
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  isLoggedIn: true,
  user: {
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    name: 'Natalie'
  }
};
