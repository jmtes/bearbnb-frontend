import React from 'react';

import User from './User';

export default {
  title: 'User',
  component: User
};

const Template = (args) => <User {...args} />;

export const NotLoggedIn = Template.bind({});
NotLoggedIn.args = {
  isLoggedIn: false
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  isLoggedIn: true,
  user: {
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    name: 'Natalie'
  }
};
