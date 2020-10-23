import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Link } from 'react-router-dom';
import 'jest-styled-components';
import { Provider } from 'react-redux';

import User, {
  UserButton,
  UserMenu,
  UserName
} from '../../src/components/User/User';
import { storeNotLoggedIn, storeLoggedIn } from '../../mocks/storeMock';

describe('User Component', () => {
  describe('Common', () => {
    beforeAll(() => {
      const testRoot = document.createElement('div');
      testRoot.setAttribute('id', 'test-root');
      document.body.appendChild(testRoot);
    });

    afterEach(() => {
      const testRoot = document.querySelector('#test-root');

      ReactDOM.unmountComponentAtNode(testRoot);
    });

    test('Menu is hidden by default', () => {
      const wrapper = mount(
        <Provider store={storeNotLoggedIn}>
          <MemoryRouter>
            <User />
          </MemoryRouter>
        </Provider>
      );

      const menu = wrapper.find(UserMenu);
      const menuIsHidden = menu.props().hidden;

      expect(menuIsHidden).toBe(true);
    });

    test('Clicking on button shows menu', () => {
      const wrapper = mount(
        <Provider store={storeNotLoggedIn}>
          <MemoryRouter>
            <User />
          </MemoryRouter>
        </Provider>
      );
      const button = wrapper.find(UserButton);

      button.simulate('click');

      const menu = wrapper.find(UserMenu);
      const menuIsHidden = menu.props().hidden;

      expect(menuIsHidden).toBe(false);
    });

    test('Focus is shifted to first menu link when clicked', () => {
      const wrapper = mount(
        <Provider store={storeNotLoggedIn}>
          <MemoryRouter>
            <User />
          </MemoryRouter>
        </Provider>,
        { attachTo: document.querySelector('#test-root') }
      );
      const button = wrapper.find(UserButton);

      button.simulate('click');

      const menu = wrapper.find(UserMenu);
      const firstLink = menu.find('a').first().getDOMNode();

      expect(document.activeElement).toBe(firstLink);
    });

    test('Focus is shifted back to button if escape is pressed within menu', () => {
      const wrapper = mount(
        <Provider store={storeNotLoggedIn}>
          <MemoryRouter>
            <User />
          </MemoryRouter>
        </Provider>,
        { attachTo: document.querySelector('#test-root') }
      );
      const button = wrapper.find(UserButton);

      button.simulate('click');

      const menu = wrapper.find(UserMenu);
      menu.simulate('keydown', { key: 'Escape' });

      const buttonNode = button.getDOMNode();

      expect(document.activeElement).toBe(buttonNode);
    });
  });

  describe('Not logged in', () => {
    test('"Guest Hibermate" shows up as the default user name', () => {
      const wrapper = mount(
        <Provider store={storeNotLoggedIn}>
          <MemoryRouter>
            <User />
          </MemoryRouter>
        </Provider>
      );
      const name = wrapper.find(UserName);

      expect(name.text()).toBe('Guest Hibermate');
    });

    test('Menu contains login and sign-up links', () => {
      const wrapper = mount(
        <Provider store={storeNotLoggedIn}>
          <MemoryRouter>
            <User />
          </MemoryRouter>
        </Provider>
      );
      const menu = wrapper.find(UserMenu);

      const loginLink = menu.find('a[href="/login"]');
      expect(loginLink.text()).toBe('Log in');

      const signupLink = menu.find('a[href="/register"]');
      expect(signupLink.text()).toBe('Sign up');
    });
  });

  describe('Logged in', () => {
    test("Displays logged-in user's name", () => {
      const wrapper = mount(
        <Provider store={storeLoggedIn}>
          <MemoryRouter>
            <User />
          </MemoryRouter>
        </Provider>
      );
      const name = wrapper.find(UserName);

      expect(name.text()).toBe(storeLoggedIn.getState().auth.user.name);
    });

    test("Displays only user's first name if they provided their full name", () => {
      const wrapper = mount(
        <Provider store={storeLoggedIn}>
          <MemoryRouter>
            <User />
          </MemoryRouter>
        </Provider>
      );
      const name = wrapper.find(UserName);

      expect(name.text()).toBe('Natalie');
    });

    test('Menu contains logout link', () => {
      const wrapper = mount(
        <Provider store={storeLoggedIn}>
          <MemoryRouter>
            <User />
          </MemoryRouter>
        </Provider>
      );

      const menu = wrapper.find(UserMenu);

      const loginLink = menu.find('a[href="/logout"]');
      expect(loginLink.text()).toBe('Log out');
    });
  });
});
