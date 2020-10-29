import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Link } from 'react-router-dom';
import 'jest-styled-components';
import { Provider } from 'react-redux';

import Header, { TextLogo } from '../../src/components/Header/Header';
import Logo from '../../src/components/Logo/Logo';
import User from '../../src/components/User/User';
import { storeNotLoggedIn } from '../../mocks/storeMock';

import logo from '../../src/assets/logo_colored.svg';

describe('Header Component', () => {
  const wrapper = mount(
    <Provider store={storeNotLoggedIn}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

  test('Renders text logo as link to home', () => {
    const textLogo = wrapper.find(TextLogo);
    const link = textLogo.find(Link);

    expect(link.text()).toBe('bearbnb');
    expect(link.props().to).toBe('/');
  });

  test('Renders logo image at the correct size', () => {
    const logoImg = wrapper.find(Logo);

    expect(logoImg.props().size).toBe('2.625rem');
  });

  test('Renders user menu', () => {
    const userMenu = wrapper.find(User);

    expect(userMenu.exists()).toBe(true);
  });
});
