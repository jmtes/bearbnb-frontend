import React from 'react';
import { action } from '@storybook/addon-actions';
import isEmail from 'validator/lib/isEmail';

import Input from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
  decorators: [(story) => <div style={{ width: '500px' }}>{story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          'A component that accepts and validates user input. Note that, because input value changes and validation are managed by a parent `Form` component, the following examples do not work functionally and are meant to only give an idea of what each input field variant used in the app looks like. Please refer to the relevant form component, listed in the description of each story, to see the input validation in action.'
      }
    }
  },
  argTypes: {
    id: {
      description:
        'The unique id with which the input should be identified. Parent Form component should have a corresponding key in both its `values` and `errors` states in order for state changes and validation to work.'
    },
    label: {
      description: 'The text for the input label.'
    },
    type: {
      description:
        'The type of input to be rendered, e.g. `text`, `number`, `date`, etc.'
    },
    value: {
      description:
        'The value of the component. Should be a piece of state passed down from parent Form component.'
    },
    error: {
      description:
        'The validation errors of the component, should there be any. Should be a piece of state passed down from parent Form component.'
    },
    onChange: {
      description:
        "Handler for changes to input. Should accept an event, set `values` in the parent Form component's state to the event target (the input's) value, and validate said value, setting `errors` in the parent Form component's state if invalid."
    },
    onBlur: {
      description:
        "Handler for input blur. Should accept an event and validate the event target (the input's) value, setting `errors` in the parent Form component's state if invalid."
    },
    placeholder: {
      description: 'The input placeholder text.'
    },
    options: {
      description:
        'Miscellaneous options to apply to the input that are not universally applicable to all input types, e.g. `min` for `number` inputs. Be sure to use JSX attribute names, e.g. `autoComplete` rather than `autocomplete`.'
    },
    width: {
      description:
        'The width of the rendered input component, e.g. `4rem`, `200px`, `100%`.'
    },
    borderRadius: {
      description:
        'The border radius of the rendered input component, e.g. `24px`.'
    },
    icon: {
      description:
        'The optional icon toinclude in the rendered input component. Accepted values are `location`, `calendar`, and `person`.'
    }
  }
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'test',
  label: 'Input',
  placeholder: 'Placeholder',
  value: '',
  onChange: () => {},
  onBlur: () => {}
};

export const Name = Template.bind({});
Name.args = {
  ...Default.args,
  id: 'name',
  label: 'Name',
  type: 'text',
  placeholder: 'Rick',
  options: { autoComplete: 'off' }
};
Name.parameters = {
  docs: {
    storyDescription:
      'Input that accepts a user name, used in `SignupForm`. Displays validation error if name is shorter than 2 characters or longer than 32.'
  }
};

export const Email = Template.bind({});
Email.args = {
  ...Default.args,
  id: 'email',
  label: 'Email',
  type: 'email',
  placeholder: 'rick@gmail.com'
};
Email.parameters = {
  docs: {
    storyDescription:
      'Input that accepts a user email address, used in `LoginForm` and `SignupForm`. Displays validation error if field is empty or if an invalid email was entered.'
  }
};

export const Password = Template.bind({});
Password.args = {
  ...Default.args,
  id: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Must contain at least 8 characters',
  options: { minLength: 8 }
};
Password.parameters = {
  docs: {
    storyDescription:
      'Input that accepts a user password, used in `LoginForm` and `SignupForm`. Displays validation error if password is shorter than 8 characters.'
  }
};

export const ConfirmPassword = Template.bind({});
ConfirmPassword.args = {
  ...Default.args,
  id: 'confirm-password',
  label: 'Confirm Password',
  type: 'password',
  placeholder: 'Must match previous field'
};
ConfirmPassword.parameters = {
  docs: {
    storyDescription:
      'Input that accepts a user password, used in `SignupForm`. Displays validation error if password does not match that which had been entered in the `Password` input.'
  }
};

export const Location = Template.bind({});
Location.args = {
  ...Default.args,
  id: 'query',
  label: 'Location',
  type: 'text',
  placeholder: 'Los Angeles, California',
  icon: 'location'
};
Location.parameters = {
  docs: {
    storyDescription:
      'Input that accepts a location name (city, state, country), used in `SearchForm`. Displays validation error if field is left empty.'
  }
};

export const Checkin = Template.bind({});
Checkin.args = {
  ...Default.args,
  id: 'checkin',
  label: 'Checkin',
  type: 'date',
  icon: 'calendar',
  width: '50%'
};
Checkin.parameters = {
  docs: {
    storyDescription:
      "Input that accepts the date on which a user plans on checking in to a listing, used in `SearchForm` and `ReservationForm`. Displays validation error in the following scenarios: field is left empty, input is not in YYYY-MM-DD format, date is invalid (e.g. `2020-10-32`), date is before today's date."
  }
};

export const Checkout = Template.bind({});
Checkout.args = {
  ...Default.args,
  id: 'checkout',
  label: 'Checkout',
  type: 'date',
  icon: 'calendar',
  width: '50%'
};
Checkout.parameters = {
  docs: {
    storyDescription:
      'Input that accepts the date on which a user plans on checking out of a listing, used in `SearchForm` and `ReservationForm`. Displays validation error in the following scenarios: field is left empty, input is not in YYYY-MM-DD format, date is invalid (e.g. `2020-10-32`), date is before date entered in `Checkin` input.'
  }
};

export const Guests = Template.bind({});
Guests.args = {
  ...Default.args,
  id: 'guests',
  label: 'Guests',
  type: 'number',
  placeholder: '1',
  icon: 'person',
  options: { min: 1 }
};
Guests.parameters = {
  docs: {
    storyDescription:
      'Input that accepts the projected number of guests to stay at the listing, used in `SearchForm` and `ReservationForm`. Displays validation error in the following scenarios: field is left empty, input is less than 1, input is a non-integer.'
  }
};
