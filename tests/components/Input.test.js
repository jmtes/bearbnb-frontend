import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Input from '../../src/components/Form/Input';
import { Default } from '../../src/components/Form/Input.stories';

describe('Input Component', () => {
  describe('Props', () => {
    test('Id prop sets id attribute of each input as expected', () => {
      const wrapper = shallow(<Input {...Default.args} />);
      const input = wrapper.find('input');

      expect(input.props().id).toBe(Default.args.id);
    });

    test('Label prop sets label of each input as expected', () => {
      const wrapper = shallow(<Input {...Default.args} />);
      const label = wrapper.find('label');

      expect(label.props().htmlFor).toBe(Default.args.id);
      expect(label.text()).toBe(Default.args.label);
    });

    test('Type prop sets the type of each input as expected', () => {
      const type = 'email';
      const wrapper = shallow(<Input {...Default.args} type={type} />);
      const input = wrapper.find('input');

      expect(input.props().type).toBe(type);
    });

    test('Type prop defaults to text', () => {
      const wrapper = shallow(<Input {...Default.args} />);
      const input = wrapper.find('input');

      expect(input.props().type).toBe('text');
    });

    test('Value prop sets the value of the input as expected', () => {
      const value = "I think I've seen this film before...";
      const wrapper = shallow(<Input {...Default.args} value={value} />);
      const input = wrapper.find('input');

      expect(input.props().value).toBe(value);
    });

    test('Value prop defaults to an empty string', () => {
      const wrapper = shallow(<Input {...Default.args} />);
      const input = wrapper.find('input');

      expect(input.props().value).toBe('');
    });

    test('Error prop sets the value of the input as expected', () => {
      const error = 'This field is required';
      const wrapper = shallow(<Input {...Default.args} error={error} />);

      const errorMsg = wrapper.find('span.error-msg');
      const srErrorMsg = wrapper.find('span.error-msg + span.visually-hidden');

      expect(errorMsg.text()).toBe(error);
      expect(srErrorMsg.text()).toBe(`input error: ${error}`);
    });

    test('Error prop defaults to null', () => {
      const wrapper = shallow(<Input {...Default.args} />);

      const errorMsg = wrapper.find('span.error-msg');
      const srErrorMsg = wrapper.find('span.error-msg + span.visually-hidden');

      expect(errorMsg.text()).toBeFalsy();
      expect(srErrorMsg.text()).toBeFalsy();
    });

    test('Placeholder prop sets input placeholder as expected', () => {
      const wrapper = shallow(<Input {...Default.args} />);
      const input = wrapper.find('input');

      expect(input.props().placeholder).toBe(Default.args.placeholder);
    });

    test('Placeholder prop defaults to an empty string', () => {
      const wrapper = shallow(
        <Input {...Default.args} placeholder={undefined} />
      );
      const input = wrapper.find('input');

      expect(input.props().placeholder).toBe('');
    });

    test('Options prop sets miscellaneous input options as expected', () => {
      const wrapper = shallow(
        <Input {...Default.args} options={{ minLength: 10 }} />
      );
      const input = wrapper.find('input');

      expect(input.props().minLength).toBe(10);
    });

    test('Width prop sets component width as expected', () => {
      const width = '50%';
      const wrapper = shallow(<Input {...Default.args} width={width} />);

      expect(wrapper.props().width).toBe(width);
    });

    test('Width prop defaults to 100% of parent element', () => {
      const wrapper = shallow(<Input {...Default.args} />);

      expect(wrapper.props().width).toBe('100%');
    });

    test('Border radius prop sets component border radius as expected', () => {
      const borderRadius = '0px';
      const wrapper = shallow(
        <Input {...Default.args} borderRadius={borderRadius} />
      );

      expect(wrapper.props().borderRadius).toBe(borderRadius);
    });

    test('Border radius prop defaults to 12px', () => {
      const wrapper = shallow(<Input {...Default.args} />);

      expect(wrapper.props().borderRadius).toBe('12px');
    });

    test('Icon prop renders the proper icon', () => {
      const icon = 'person';
      const wrapper = shallow(<Input {...Default.args} icon={icon} />);
      const renderedIcon = wrapper.find('.icon img');

      expect(renderedIcon.exists()).toBe(true);
    });

    test('Icon prop defaults to null, resulting in no icon being rendered', () => {
      const wrapper = shallow(<Input {...Default.args} />);
      const renderedIcon = wrapper.find('.icon img');

      expect(renderedIcon.exists()).toBe(false);
    });

    test('If icon prop is not "location", "calendar", or "icon", it is seen as invalid and thus no icon is rendered', () => {
      const icon = 'hoax';
      const wrapper = shallow(<Input {...Default.args} icon={icon} />);
      const renderedIcon = wrapper.find('.icon img');

      expect(renderedIcon.exists()).toBe(false);
    });
  });

  describe('User Interactions', () => {
    test('onChange is called on input change', () => {
      const onChange = jest.fn();

      const wrapper = shallow(<Input {...Default.args} onChange={onChange} />);
      const input = wrapper.find('input');

      input.simulate('change', { target: { value: 'California' } });

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('onBlur is called on input blur', () => {
      const onBlur = jest.fn();

      const wrapper = shallow(<Input {...Default.args} onBlur={onBlur} />);
      const input = wrapper.find('input');

      input.simulate('blur');

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });
});
