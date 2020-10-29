import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';

import Button from '../../src/components/Button/Button';

describe('Button Component', () => {
  describe('Props', () => {
    test('Type prop sets the rendered button type as expected', () => {
      const type = 'submit';
      const wrapper = shallow(<Button type={type} />);

      expect(wrapper.props().type).toBe(type);
    });

    test('Type prop defaults to button', () => {
      const wrapper = shallow(<Button />);

      expect(wrapper.props().type).toBe('button');
    });

    test('Text prop sets rendered button text as expected', () => {
      const text = 'gec';
      const wrapper = shallow(<Button text={text} />);

      expect(wrapper.text()).toBe(text);
    });

    test('Text prop defaults to "Click"', () => {
      const wrapper = shallow(<Button />);

      expect(wrapper.text()).toBe('Click');
    });

    test('Variant prop sets rendered button variant as expected', () => {
      const variant = 'secondary';
      const wrapper = shallow(<Button variant={variant} />);

      expect(wrapper.props().variant).toBe(variant);
    });

    test('Variant prop defaults to primary if it is passed neither "primary" or "secondary"', () => {
      const variant = 'vanessa';
      const wrapper = shallow(<Button variant={variant} />);

      expect(wrapper.props().variant).toBe('primary');
    });

    test('Variant prop defaults to primary if not provided', () => {
      const wrapper = shallow(<Button />);

      expect(wrapper.props().variant).toBe('primary');
    });

    test('Size prop sets rendered button size as expected', () => {
      const size = 'large';
      const wrapper = shallow(<Button size={size} />);

      expect(wrapper.props().size).toBe(size);
    });

    test('Size prop defaults to normal if passed none of the following: "large", "normal", "small"', () => {
      const size = 'crystal';
      const wrapper = shallow(<Button size={size} />);

      expect(wrapper.props().size).toBe('normal');
    });

    test('Size prop defaults to normal if not provided', () => {
      const wrapper = shallow(<Button />);

      expect(wrapper.props().size).toBe('normal');
    });

    test('Disabled prop enables/disables button as expected', () => {
      const disabled = true;
      const wrapper = shallow(<Button disabled={disabled} />);

      expect(wrapper.props().disabled).toBe(disabled);
      expect(wrapper.props()['aria-disabled']).toBe(disabled);
    });

    test('Disabled prop defaults to false', () => {
      const wrapper = shallow(<Button />);

      expect(wrapper.props().disabled).toBe(false);
      expect(wrapper.props()['aria-disabled']).toBe(false);
    });
  });

  describe('User Interactions', () => {
    test('onClick is called on enabled button click', () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Button onClick={onClick} />);

      wrapper.simulate('click');

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
