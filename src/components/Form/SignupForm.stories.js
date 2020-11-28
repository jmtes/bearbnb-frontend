import React from 'react';

import SignupForm from './SignupForm';
import Form from './Form';
import Input from './Input';

export default {
  title: 'Forms/SignupForm',
  component: SignupForm,
  subcomponents: { Form, Input }
};

const Template = (args) => <SignupForm {...args} />;

export const Default = Template.bind({});
