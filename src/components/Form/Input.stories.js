import React from 'react';
import { action } from '@storybook/addon-actions';

import Input from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
  decorators: [(story) => <div style={{ width: '500px' }}>{story()}</div>]
};

const Template = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
  id: 'name',
  label: 'Name',
  type: 'text',
  placeholder: 'Enter your name',
  options: { autoComplete: 'off' },
  validateInput: (input) => {
    action('Input Blur')();

    if (input.length < 2) return 'Must be at least 2 characters';
    else if (input.length > 32) return 'Must not exceed 32 characters';
    else return null;
  }
};
