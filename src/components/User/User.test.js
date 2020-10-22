import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import 'jest-styled-components';

import User, { UserButton, UserMenu } from './User';
import { NotLoggedIn, LoggedIn } from './User.stories';

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
      const wrapper = shallow(<User />);

      const menu = wrapper.find('#user-menu');
      const menuIsHidden = menu.props().hidden;

      expect(menuIsHidden).toBe(true);
    });

    test('Clicking on button shows menu', () => {
      const wrapper = mount(
        <MemoryRouter>
          <User />
        </MemoryRouter>
      );
      const button = wrapper.find(UserButton);

      button.simulate('click');

      const menu = wrapper.find(UserMenu);
      const menuIsHidden = menu.props().hidden;

      expect(menuIsHidden).toBe(false);
    });

    test('Focus is shifted to first menu link when clicked', () => {
      const wrapper = mount(
        <MemoryRouter>
          <User />
        </MemoryRouter>,
        { attachTo: document.querySelector('#test-root') }
      );
      const button = wrapper.find(UserButton);

      button.simulate('click');

      const menu = wrapper.find(UserMenu);
      const firstLink = menu.find('a').first().getDOMNode();

      expect(document.activeElement).toBe(firstLink);
    });

    test('Focus is shifted back to button if escape is pressed within menu', () => {});
  });

  describe('Not logged in', () => {
    test('"Guest Hibermate" shows up as the default user name', () => {});

    test('Menu contains login and sign-up links', () => {});
  });

  describe('Logged in', () => {
    test("Displays logged-in user's name", () => {});

    test('Menu contains logout link', () => {});
  });
});
