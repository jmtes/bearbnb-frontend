import React from 'react';

import SearchForm from './SearchForm';

export default {
  title: 'Forms/SearchForm',
  component: SearchForm
};

const Template = (args) => <SearchForm {...args} />;

export const Default = Template.bind({});
