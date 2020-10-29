import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Logo from '../../src/components/Logo/Logo';

import logo from '../../src/assets/logo_colored.svg';

describe('Logo Component', () => {
  describe('Props', () => {
    test('Size prop sets rendered logo size as expected', () => {
      const size = '100px';
      const wrapper = shallow(<Logo size={size} />);

      expect(wrapper.props().size).toBe(size);
    });

    test('Size defaults to 2.625rem', () => {
      const wrapper = shallow(<Logo />);

      expect(wrapper.props().size).toBe('2.625rem');
    });
  });
});
