import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'A rather self-explanatory component! Use for calls to user action.'
      }
    }
  },
  argTypes: {
    text: {
      description: 'What the button should say.'
    },
    variant: {
      description:
        'The type of button to render. Can be either `primary` or `secondary`.'
    },
    size: {
      description:
        'The size of the rendered button. Can be `large`, `normal`, or `small`.'
    },
    disabled: {
      description: 'Whether or not the button can be interacted with.'
    },
    onClick: {
      description: 'Function that runs every time the button is clicked.'
    }
  }
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Primary',
  onClick: action('clicked')
};

export const Primary = Template.bind({});
Primary.args = { ...Default.args };

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  text: 'Secondary',
  variant: 'secondary'
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  ...Default.args,
  disabled: true
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  ...Secondary.args,
  disabled: true
};

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = {
  ...Default.args,
  size: 'large'
};

export const SecondaryLarge = Template.bind({});
SecondaryLarge.args = {
  ...Secondary.args,
  size: 'large'
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  ...Default.args,
  size: 'small'
};

export const SecondarySmall = Template.bind({});
SecondarySmall.args = {
  ...Secondary.args,
  size: 'small'
};
