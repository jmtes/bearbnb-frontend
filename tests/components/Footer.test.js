import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Link } from 'react-router-dom';
import 'jest-styled-components';
import { Provider } from 'react-redux';

import Footer from '../../src/components/Footer/Footer';

describe('Footer Component', () => {
  const wrapper = shallow(<Footer />);

  test('Renders expected text', () => {
    expect(wrapper.text()).toBe('made by juno tesoro');
  });

  test('Contains link to my Github', () => {
    const link = wrapper.find('a');

    expect(link.props().href).toBe('https://github.com/jmtes');
  });
});
