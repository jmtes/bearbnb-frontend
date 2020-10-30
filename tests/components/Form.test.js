import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';

import Form, { StyledForm } from '../../src/components/Form/Form';
import Button from '../../src/components/Button/Button';
import Logo from '../../src/components/Logo/Logo';

describe('Form Component', () => {
  describe('Props', () => {
    test('Title prop sets rendered form title as expected', () => {
      const title = 'Power and Control';

      const wrapper = shallow(<Form title={title} />);
      const renderedTitle = wrapper.find('h1');

      expect(renderedTitle.text()).toBe(title);
    });

    test('Title defaults to "Form"', () => {
      const wrapper = shallow(<Form />);
      const renderedTitle = wrapper.find('h1');

      expect(renderedTitle.text()).toBe('Form');
    });

    test('Subtitle prop sets rendered form subtitle as expected', () => {
      const subtitle = "With a taste of your lips I'm on a ride";

      const wrapper = shallow(<Form subtitle={subtitle} />);
      const renderedSubtitle = wrapper.find('h2');

      expect(renderedSubtitle.text()).toBe(subtitle);
    });

    test('Subtitle is not rendered if not provided', () => {
      const wrapper = shallow(<Form />);
      const renderedSubtitle = wrapper.find('h2');

      expect(renderedSubtitle.exists()).toBe(false);
    });

    test('Title size prop sets font size of rendered form title as expected', () => {
      const titleSize = '3rem';
      const wrapper = shallow(<Form titleSize={titleSize} />);

      expect(wrapper.props().titleSize).toBe(titleSize);
    });

    test('Title size defaults to 1.5rem', () => {
      const wrapper = shallow(<Form />);

      expect(wrapper.props().titleSize).toBe('1.5rem');
    });

    test('Button text prop sets form button text as expected', () => {
      const buttonText = 'Log in';

      const wrapper = shallow(<Form buttonText={buttonText} />);
      const button = wrapper.find(Button);

      expect(button.props().text).toBe(buttonText);
    });

    test('Button text defaults to "Submit"', () => {
      const wrapper = shallow(<Form />);
      const button = wrapper.find(Button);

      expect(button.props().text).toBe('Submit');
    });

    test('Button size props sets form button size as expected', () => {
      const buttonSize = 'small';

      const wrapper = shallow(<Form buttonSize={buttonSize} />);
      const button = wrapper.find(Button);

      expect(button.props().size).toBe(buttonSize);
    });

    test('Button size defaults to normal', () => {
      const wrapper = shallow(<Form />);
      const button = wrapper.find(Button);

      expect(button.props().size).toBe('normal');
    });

    test('Submit enabled prop enables/disables form button as expected', () => {
      const submitEnabled = false;

      const wrapper = shallow(<Form submitEnabled={submitEnabled} />);
      const button = wrapper.find(Button);

      expect(button.props().disabled).toBe(!submitEnabled);
    });

    test('Submit enabled defaults to true by default', () => {
      const wrapper = shallow(<Form />);
      const button = wrapper.find(Button);

      expect(button.props().disabled).toBe(!true);
    });

    test('Show logo prop renders logo in form if true', () => {
      const showLogo = true;

      const wrapper = shallow(<Form showLogo={showLogo} />);
      const logo = wrapper.find(Logo);

      expect(logo.exists()).toBe(true);
    });

    test('Show logo prop does not render logo in form if false', () => {
      const showLogo = false;

      const wrapper = shallow(<Form showLogo={showLogo} />);
      const logo = wrapper.find(Logo);

      expect(logo.exists()).toBe(false);
    });

    test('Show logo prop defaults to false', () => {
      const wrapper = shallow(<Form />);
      const logo = wrapper.find(Logo);

      expect(logo.exists()).toBe(false);
    });

    test('Width prop sets rendered form width as expected', () => {
      const width = '75%';
      const wrapper = shallow(<Form width={width} />);

      expect(wrapper.props().width).toBe(width);
    });

    test('Width prop defaults to 35.75rem', () => {
      const wrapper = shallow(<Form />);

      expect(wrapper.props().width).toBe('35.75rem');
    });
  });

  describe('Rendered Elements', () => {
    test('Children are rendered inside of form', () => {
      const wrapper = mount(
        <Form>
          <p>I was twitching while you painted your eyes</p>
          <p>Feeling all lit up inside</p>
          <p>Like the torches on St. John's Eve</p>
        </Form>
      );

      const form = wrapper.find('form');
      const children = form.children('p');

      expect(children.length).toBe(3);
    });
  });

  describe('User Interactions', () => {
    test('onFormSubmit is called upon form submit', () => {
      const onFormSubmit = jest.fn();

      const wrapper = shallow(<Form onFormSubmit={onFormSubmit} />);
      const form = wrapper.find(StyledForm);

      form.simulate('submit', { preventDefault: () => {} });
      expect(onFormSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
