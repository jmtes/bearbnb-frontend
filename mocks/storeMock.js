import { action } from '@storybook/addon-actions';

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
