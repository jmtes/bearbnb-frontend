import React from 'react';
import { action } from '@storybook/addon-actions';
import isEmail from 'validator/lib/isEmail';

import Input from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
  decorators: [(story) => <div style={{ width: '500px' }}>{story()}</div>]
};

const Template = (args) => <Input {...args} />;

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
