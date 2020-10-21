import React from 'react';
import { shallow } from 'enzyme';

import User from './User';

describe('User Component', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<User />);

    expect(wrapper.exists()).toBe(true);
  });
});
