import React from 'react';
import { action } from '@storybook/addon-actions';

import Form from './Form';

export default {
  title: 'Forms/Forms',
  component: Form
};

const Template = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...Form.defaultProps,
  title: 'Form Title',
  onFormSubmit: action('Submit')
};
