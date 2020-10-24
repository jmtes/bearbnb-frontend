import React from 'react';

import Form from './Form';

export default {
  title: 'Forms/Forms',
  component: Form
};

const Template = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Form Title',
  children: []
};
