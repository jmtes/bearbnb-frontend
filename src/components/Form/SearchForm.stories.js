import React from 'react';

import SearchForm from './SearchForm';
import Form from './Form';
import Input from './Input';

export default {
  title: 'Forms/SearchForm',
  component: SearchForm,
  subcomponents: { Form, Input }
};

const Template = (args) => <SearchForm {...args} />;

export const Default = Template.bind({});
