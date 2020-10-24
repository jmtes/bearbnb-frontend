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
  options: { autocomplete: 'off' },
  onInputChange: action('Input Change')
};
