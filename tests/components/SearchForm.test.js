import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import isSameDay from 'date-fns/isSameDay';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByTestId
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';

import SearchForm from '../../src/components/Form/SearchForm';
import Input from '../../src/components/Form/Input';
import Button from '../../src/components/Button/Button';

describe('SearchForm Component', () => {
  describe('Default State', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<SearchForm />);
    });

    test('Location input is empty by default', () => {
      const location = wrapper.find(Input).at(0);

      expect(location.props().value).toBe('');
    });

    test("Checkin input has value of today's date by default", () => {
      const checkin = wrapper.find(Input).at(1);

      expect(isSameDay(checkin.props().value, new Date())).toBe(true);
    });

    test("Checkout input has value of tomorrow's date by default", () => {
      const checkout = wrapper.find(Input).at(2);

      expect(isSameDay(checkout.props().value, addDays(new Date(), 1))).toBe(
        true
      );
    });

    test('Guests input has value of 1 by default', () => {
      const guests = wrapper.find(Input).at(3);

      expect(guests.props().value).toBe(1);
    });

    test('All errors are null by default, thus rendering an empty form-error span', () => {
      const location = wrapper.find(Input).at(0);
      const checkin = wrapper.find(Input).at(1);
      const checkout = wrapper.find(Input).at(2);
      const guests = wrapper.find(Input).at(3);

      expect(location.props().error).toBe(null);
      expect(checkin.props().error).toBe(null);
      expect(checkout.props().error).toBe(null);
      expect(guests.props().error).toBe(null);

      const formError = wrapper.find('.form-error');
      expect(formError.text()).toBe('');
    });

    test('Submit is disabled by default', () => {
      wrapper = mount(<SearchForm />);
      const submit = wrapper.find(Button);

      expect(submit.props().disabled).toBe(true);
    });
  });

  describe('Input Validation', () => {
    const errors = {
      location: {
        empty: 'This field is required'
      },
      dates: {
        empty: 'Must enter a valid date',
        invalid: 'Must enter a valid date',
        wrongFormat: 'Must enter a valid date',
        checkinBeforeToday: "Cannot be before today's date",
        checkoutBeforeCheckin: 'Must be after checkin date'
      },
      guests: {
        nonInteger: 'Must be a positive integer',
        zero: 'Must be a positive integer',
        negative: 'Must be a positive integer'
      }
    };

    test('Location displays error if input is changed to empty', async () => {
      render(<SearchForm />);

      userEvent.type(screen.getByLabelText('Location'), 'L');
      userEvent.clear(screen.getByLabelText('Location'));

      await waitFor(() =>
        expect(
          screen.getByTestId('location-error-msg')
        ).not.toBeEmptyDOMElement()
      );

      expect(screen.getByTestId('location-error-msg')).toHaveTextContent(
        errors.location.empty
      );
      expect(screen.getByTestId('location-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.location.empty}`
      );
    });

    test('Location displays error if input is left empty', () => {
      render(<SearchForm />);

      userEvent.tab();
      expect(screen.getByLabelText('Location')).toHaveFocus();

      userEvent.tab();
      expect(screen.getByTestId('location-error-msg')).toHaveTextContent(
        errors.location.empty
      );
      expect(screen.getByTestId('location-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.location.empty}`
      );
    });

    // Because the following inputs have default values, they are only tested with the onChange event rather than both the onChange and onBlur events.
    test('Checkin displays error if input is not in YYYY-MM-DD format', async () => {
      render(<SearchForm />);

      userEvent.clear(screen.getByLabelText('Checkin'));

      const twoDaysFromNow = format(addDays(new Date(), 2), 'MMM d, yyyy');
      userEvent.type(screen.getByTestId('checkin'), twoDaysFromNow);

      expect(screen.getByTestId('checkin')).toHaveAttribute(
        'value',
        twoDaysFromNow
      );

      await waitFor(() => {
        expect(
          screen.getByTestId('checkin-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      expect(screen.getByTestId('checkin-error-msg')).toHaveTextContent(
        errors.dates.wrongFormat
      );
      expect(screen.getByTestId('checkin-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.dates.wrongFormat}`
      );
    });

    test('Checkin displays error if input is not a valid date, e.g. 2020-10-32', async () => {
      render(<SearchForm />);

      userEvent.clear(screen.getByLabelText('Checkin'));
      userEvent.type(screen.getByTestId('checkin'), '2030-10-32');

      expect(screen.getByTestId('checkin')).toHaveAttribute(
        'value',
        '2030-10-32'
      );

      await waitFor(() => {
        expect(
          screen.getByTestId('checkin-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      expect(screen.getByTestId('checkin-error-msg')).toHaveTextContent(
        errors.dates.invalid
      );
      expect(screen.getByTestId('checkin-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.dates.invalid}`
      );
    });

    test("Checkin displays error if input is before today's date", async () => {
      render(<SearchForm />);

      userEvent.clear(screen.getByLabelText('Checkin'));
      expect(screen.getByLabelText('Checkin')).toHaveValue('');

      await waitFor(() => {
        expect(
          screen.getByTestId('checkin-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      userEvent.type(screen.getByTestId('checkin'), '2019-10-28');
      expect(screen.getByTestId('checkin')).toHaveAttribute(
        'value',
        '2019-10-28'
      );

      await waitFor(() => {
        expect(screen.getByTestId('checkin-error-msg')).not.toHaveTextContent(
          errors.dates.empty
        );
      });

      expect(screen.getByTestId('checkin-error-msg')).toHaveTextContent(
        errors.dates.checkinBeforeToday
      );
      expect(screen.getByTestId('checkin-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.dates.checkinBeforeToday}`
      );
    });

    test('Checkin displays error if changed to empty', async () => {
      render(<SearchForm />);

      userEvent.clear(screen.getByLabelText('Checkin'));
      expect(screen.getByLabelText('Checkin')).toHaveAttribute('value', '');

      await waitFor(() => {
        expect(
          screen.getByTestId('checkin-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      expect(screen.getByTestId('checkin-error-msg')).toHaveTextContent(
        errors.dates.empty
      );
      expect(screen.getByTestId('checkin-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.dates.empty}`
      );
    });

    test('Checkout displays error if input is not in YYYY-MM-DD format', async () => {
      render(<SearchForm />);

      userEvent.clear(screen.getByLabelText('Checkout'));
      expect(screen.getByTestId('checkout')).toHaveValue('');

      const twoDaysFromNow = format(addDays(new Date(), 2), 'MMM d, yyyy');

      userEvent.type(screen.getByTestId('checkout'), twoDaysFromNow);
      expect(screen.getByTestId('checkout')).toHaveValue(twoDaysFromNow);

      await waitFor(() => {
        expect(
          screen.getByTestId('checkout-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      expect(screen.getByTestId('checkout-error-msg')).toHaveTextContent(
        errors.dates.wrongFormat
      );
      expect(screen.getByTestId('checkout-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.dates.wrongFormat}`
      );
    });

    test('Checkout displays error if input is not a valid date, e.g. 2020-10-32', async () => {
      render(<SearchForm />);

      userEvent.clear(screen.getByLabelText('Checkout'));
      expect(screen.getByTestId('checkout')).toHaveValue('');

      userEvent.type(screen.getByTestId('checkout'), '2030-10-32');
      expect(screen.getByTestId('checkout')).toHaveValue('2030-10-32');

      await waitFor(() => {
        expect(
          screen.getByTestId('checkout-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      expect(screen.getByTestId('checkout-error-msg')).toHaveTextContent(
        errors.dates.invalid
      );
      expect(screen.getByTestId('checkout-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.dates.invalid}`
      );
    });

    test('Checkout displays error if input is before checkin date', async () => {
      render(<SearchForm />);

      userEvent.clear(screen.getByLabelText('Checkout'));
      expect(screen.getByTestId('checkout')).toHaveValue('');

      await waitFor(() => {
        expect(
          screen.getByTestId('checkout-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      const twoDaysAgo = format(addDays(new Date(), -2), 'yyyy-M-d');
      userEvent.type(screen.getByTestId('checkout'), twoDaysAgo);

      await waitFor(() => {
        expect(screen.getByTestId('checkout-error-msg')).not.toHaveTextContent(
          errors.dates.empty
        );
      });

      expect(screen.getByTestId('checkout-error-msg')).toHaveTextContent(
        errors.dates.checkoutBeforeCheckin
      );
      expect(screen.getByTestId('checkout-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.dates.checkoutBeforeCheckin}`
      );
    });

    test('Same day checkin and checkout should be allowed', async () => {
      render(<SearchForm />);

      // Clear checkout input
      userEvent.clear(screen.getByLabelText('Checkout'));
      expect(screen.getByTestId('checkout')).toHaveValue('');

      // Wait for empty input error to show
      await waitFor(() => {
        expect(
          screen.getByTestId('checkout-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      // Get today's date in YYYY-M-D format and make sure it's the value currently in checkin
      const today = format(new Date(), 'yyyy-M-d');
      expect(screen.getByLabelText('Checkin')).toHaveValue(today);

      userEvent.type(screen.getByTestId('checkout'), today);

      // Wait for empty input error to go away
      await waitFor(() => {
        expect(screen.getByTestId('checkout-error-msg')).not.toHaveTextContent(
          errors.dates.empty
        );
      });

      // Make sure there are no displayed input errors
      expect(screen.getByTestId('checkout-error-msg')).toBeEmptyDOMElement();
      expect(screen.getByTestId('checkout-error-msg-sr')).toBeEmptyDOMElement();
    });

    test('Guests displays error if input is not an integer', async () => {
      // Render search form
      render(<SearchForm />);

      // Add decimal point to input
      userEvent.type(screen.getByLabelText('Guests'), '.5');
      expect(screen.getByTestId('guests')).toHaveValue(1.5);

      // Wait for input error to show
      await waitFor(() => {
        expect(
          screen.getByTestId('guests-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      // Check error message
      expect(screen.getByTestId('guests-error-msg')).toHaveTextContent(
        errors.guests.nonInteger
      );
      expect(screen.getByTestId('guests-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.guests.nonInteger}`
      );
    });

    test('Guests displays error if input is 0', async () => {
      // Render search form
      render(<SearchForm />);

      // Type negative number into input
      userEvent.type(screen.getByLabelText('Guests'), '{backspace}0');
      expect(screen.getByTestId('guests')).toHaveValue(0);

      await waitFor(() => {
        expect(
          screen.getByTestId('guests-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      // Check error message
      expect(screen.getByTestId('guests-error-msg')).toHaveTextContent(
        errors.guests.zero
      );
      expect(screen.getByTestId('guests-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.guests.zero}`
      );
    });

    test('Guests displays error if input is negative', async () => {
      // Render search form
      render(<SearchForm />);

      // Type negative number into guests input
      userEvent.type(screen.getByLabelText('Guests'), '{backspace}-1');
      expect(screen.getByTestId('guests')).toHaveValue(-1);

      // Wait for input error message to display
      await waitFor(() => {
        expect(
          screen.getByTestId('guests-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      // Check error message
      expect(screen.getByTestId('guests-error-msg')).toHaveTextContent(
        errors.guests.negative
      );
      expect(screen.getByTestId('guests-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.guests.negative}`
      );
    });
  });

  describe('Form Submission', () => {
    const formErrorMsg = 'Please fix all errors before submitting';
    const locationInput = 'Auckland';

    test('Submit is disabled if location input is empty', () => {
      // Render search form
      render(<SearchForm />);

      // Location input is empty by default, so just check if submit button is disabled
      expect(screen.getByText('Search')).toBeDisabled();
    });

    test('Submit is disabled if location has been invalidated', async () => {
      // Render search form
      render(<SearchForm />);

      // Tab into and out of location input
      userEvent.tab();
      expect(screen.getByLabelText('Location')).toHaveFocus();
      userEvent.tab();
      expect(screen.getByTestId('location')).not.toHaveFocus();

      // Wait for form error to show
      await waitFor(() => {
        expect(screen.getByTestId('form-error')).toHaveTextContent(
          formErrorMsg
        );
      });

      expect(screen.getByText('Search')).toBeDisabled();
    });

    test('Submit is disabled if checkin input is invalid', async () => {
      // Render search form
      render(<SearchForm />);

      // Type something into location input
      userEvent.type(screen.getByLabelText('Location'), locationInput);
      expect(screen.getByLabelText('Location')).toHaveValue(locationInput);

      // Clear checkin input
      userEvent.clear(screen.getByLabelText('Checkin'));
      expect(screen.getByTestId('checkin')).toHaveValue('');

      // Wait for form error to show
      await waitFor(() => {
        expect(screen.getByTestId('form-error')).toHaveTextContent(
          formErrorMsg
        );
      });

      // Make sure button is disabled
      expect(screen.getByText('Search')).toBeDisabled();
    });

    test('Submit is disabled if checkout input is invalid', async () => {
      // Render search form
      render(<SearchForm />);

      // Type something into location input
      userEvent.type(screen.getByLabelText('Location'), locationInput);
      expect(screen.getByLabelText('Location')).toHaveValue(locationInput);

      // Clear checkout input
      userEvent.clear(screen.getByLabelText('Checkout'));
      expect(screen.getByTestId('checkout')).toHaveValue('');

      // Wait for form error to show
      await waitFor(() => {
        expect(screen.getByTestId('form-error')).toHaveTextContent(
          formErrorMsg
        );
      });

      // Make sure submit is disabled
      expect(screen.getByText('Search')).toBeDisabled();
    });

    test('Submit is disabled if guests input is invalid', async () => {
      // Render search form
      render(<SearchForm />);

      // Type something into location input
      userEvent.type(screen.getByLabelText('Location'), locationInput);
      expect(screen.getByLabelText('Location')).toHaveValue(locationInput);

      // Clear guests input
      userEvent.clear(screen.getByLabelText('Guests'));
      expect(screen.getByTestId('guests')).toHaveValue(null);

      // Wait for form error to show
      await waitFor(() => {
        expect(screen.getByTestId('form-error')).toHaveTextContent(
          formErrorMsg
        );
      });

      // Make sure submit is disabled
      expect(screen.getByText('Search')).toBeDisabled();
    });

    test('Submit is enabled if all inputs are valid', () => {
      // Render search form
      render(<SearchForm />);

      // Type something into location input
      userEvent.type(screen.getByLabelText('Location'), locationInput);
      expect(screen.getByLabelText('Location')).toHaveValue(locationInput);

      // Make sure submit is enabled
      expect(screen.getByTestId('form-error')).toBeEmptyDOMElement();
      expect(screen.getByText('Search')).toBeEnabled();
    });
  });

  describe('Miscellaneous Effects', () => {
    test('If checkin value is changed to a date after the checkout date, the checkout value automatically changes to the day after the new checkin date', () => {
      // Render search form
      render(<SearchForm />);

      // Get date two days from now
      const twoDaysFromNow = format(addDays(new Date(), 2), 'yyyy-M-d');

      // Change checkin to two days from now
      userEvent.clear(screen.getByLabelText('Checkin'));
      userEvent.type(screen.getByTestId('checkin'), twoDaysFromNow);

      expect(screen.getByTestId('checkin')).toHaveValue(twoDaysFromNow);

      // Get date three days from now
      const threeDaysFromNow = format(addDays(new Date(), 3), 'yyyy-M-d');

      // Make sure checkout has been changed to three days from now (day after new checkin value)
      expect(screen.getByLabelText('Checkout')).toHaveValue(threeDaysFromNow);
    });
  });
});
