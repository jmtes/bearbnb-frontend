import React from 'react';
import { action } from '@storybook/addon-actions';
import isEmail from 'validator/lib/isEmail';

import Input from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
  decorators: [(story) => <div style={{ width: '500px' }}>{story()}</div>],
  parameters: {
    docs: {
      description: {
        component: 'A component that accepts and validates user input.'
      }
    }
  },
  argTypes: {
    id: {
      description:
        'The unique id with which the input should be identified. Parent Form component should have a corresponding key in both its `values` and `errors` states in order for state changes and validation to work.'
    },
    label: {
      description: 'The text for the input label.'
    },
    type: {
      description:
        'The type of input to be rendered, e.g. `text`, `number`, `date`, etc.'
    },
    value: {
      description:
        'The value of the component. Should be a piece of state passed down from parent Form component.'
    },
    error: {
      description:
        'The validation errors of the component, should there be any. Should be a piece of state passed down from parent Form component.'
    },
    onChange: {
      description:
        "Handler for changes to input. Should accept an event, set `values` in the parent Form component's state to the event target (the input's) value, and validate said value, setting `errors` in the parent Form component's state if invalid."
    },
    onBlur: {
      description:
        "Handler for input blur. Should accept an event and validate the event target (the input's) value, setting `errors` in the parent Form component's state if invalid."
    },
    placeholder: {
      description: 'The input placeholder text.'
    },
    options: {
      description:
        'Miscellaneous options to apply to the input that are not universally applicable to all input types, e.g. `min` for `number` inputs. Be sure to use JSX attribute names, e.g. `autoComplete` rather than `autocomplete`.'
    },
    width: {
      description:
        'The width of the rendered input component, e.g. `4rem`, `200px`, `100%`.'
    },
    borderRadius: {
      description:
        'The border radius of the rendered input component, e.g. `24px`.'
    },
    icon: {
      description:
        'The optional icon toinclude in the rendered input component. Accepted values are `location`, `calendar`, and `person`.'
    }
  }
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'test',
  label: 'Input',
  placeholder: 'Placeholder',
  validateInput: (input) => {
    if (!input) return 'Input cannot be empty';
    else if (input.length < 2) return 'Input is too short';
    return null;
  }
};

export const Name = Template.bind({});
Name.args = {
  id: 'name',
  label: 'Name',
  type: 'text',
  placeholder: 'Rick',
  options: { autoComplete: 'off' },
  validateInput: (input) => {
    action('Input Blur')();

    if (input.length < 2) return 'Must be at least 2 characters';
    else if (input.length > 32) return 'Must not exceed 32 characters';
    else return null;
  }
};

export const Email = Template.bind({});
Email.args = {
  id: 'email',
  label: 'Email',
  type: 'email',
  placeholder: 'rick@gmail.com',
  validateInput: (input) => {
    action('Input Blur')();

    if (!isEmail(input)) return 'Invalid email address';
    return null;
  }
};

export const Password = Template.bind({});
Password.args = {
  id: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Must contain at least 8 characters',
  options: { minLength: 8 },
  validateInput: (input) => {
    action('Input Blur')();

    if (input.length < 8) return 'Must contain at least 8 characters';
    return null;
  }
};

export const ConfirmPassword = Template.bind({});
ConfirmPassword.args = {
  id: 'confirm-password',
  label: 'Confirm Password',
  type: 'password',
  placeholder: 'Must match previous field',
  validateInput: (input) => {
    action('Input Blur')();

    return null;
  }
};

export const Location = Template.bind({});
Location.args = {
  id: 'query',
  label: 'Location',
  type: 'text',
  placeholder: 'Los Angeles, California',
  icon: 'location',
  validateInput: (input) => {
    action('Input Blur')();

    return null;
  }
};

export const Checkin = Template.bind({});
Checkin.args = {
  id: 'checkin',
  label: 'Checkin',
  type: 'date',
  icon: 'calendar',
  width: '50%',
  validateInput: () => {
    action('Input Blur')();
  }
};

export const Checkout = Template.bind({});
Checkout.args = {
  id: 'checkout',
  label: 'Checkout',
  type: 'date',
  icon: 'calendar',
  width: '50%',
  validateInput: () => {
    action('Input Blur')();
  }
};

export const Guests = Template.bind({});
Guests.args = {
  id: 'guests',
  label: 'Guests',
  type: 'number',
  placeholder: '1',
  icon: 'person',
  options: { min: 1 },
  validateInput: (input) => {
    action('Input Blur')();

    if (!Number.isInteger(parseFloat(input, 10)))
      return 'Number must be an integer';
    return null;
  }
};
