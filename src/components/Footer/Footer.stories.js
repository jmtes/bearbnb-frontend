import React from 'react';

import Footer from './Footer';

export default {
  title: 'Footer',
  component: Footer,
  params: {
    docs: {
      description: {
        component: 'The footer at the bottom of each page'
      }
    }
  }
};

const Template = (args) => <Footer {...args} />;

export const Default = Template.bind({});
