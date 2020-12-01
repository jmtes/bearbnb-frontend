import React from 'react';
import 'jest-styled-components';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';

import SignupForm from '../../src/components/Form/SignupForm';

describe('SignupForm Component', () => {
  describe('Default State', () => {
    test('All inputs are empty by default', () => {
      render(<SignupForm />);

      expect(screen.getByLabelText('Name')).toHaveValue('');
      expect(screen.getByLabelText('Email')).toHaveValue('');
      expect(screen.getByLabelText('Password')).toHaveValue('');
      expect(screen.getByLabelText('Confirm Password')).toHaveValue('');
    });

    test('All errors are null by default, thus rendering an empty form-error span', () => {
      render(<SignupForm />);

      expect(screen.getByTestId('form-error')).toBeEmptyDOMElement();
    });

    test('Submit is disabled by default', () => {
      render(<SignupForm />);

      expect(screen.getByText('Create Account')).toBeDisabled();
    });
  });

  describe('Input Validation', () => {
    const errors = {
      name: {
        empty: 'Must be at least 2 characters',
        tooShort: 'Must be at least 2 characters'
      },
      email: {
        empty: 'Invalid email address',
        invalid: 'Invalid email address'
      },
      password: {
        empty: 'Must be at least 8 characters',
        tooShort: 'Must be at least 8 characters'
      },
      confirmPassword: {
        empty: 'Passwords do not match',
        notMatch: 'Passwords do not match',
        noPassword: 'Please enter a password in the above field'
      }
    };

    test('Name displays error if changed to empty', async () => {
      render(<SignupForm />);

      // Enter valid input, then clear it
      userEvent.type(screen.getByLabelText('Name'), 'Juno');
      userEvent.clear(screen.getByLabelText('Name'));

      // Wait for error message to display
      await waitFor(() => {
        expect(screen.getByTestId('name-error-msg')).not.toBeEmptyDOMElement();
      });

      // Check content of error message
      expect(screen.getByTestId('name-error-msg')).toHaveTextContent(
        errors.name.empty
      );
      expect(screen.getByTestId('name-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.name.empty}`
      );
    });

    test('Name displays error if left empty', async () => {
      render(<SignupForm />);

      // Put name field in focus
      userEvent.tab();
      expect(screen.getByLabelText('Name')).toHaveFocus();

      // Put name field out of focus
      userEvent.tab();

      // Check content of error message
      expect(screen.getByTestId('name-error-msg')).toHaveTextContent(
        errors.name.empty
      );
      expect(screen.getByTestId('name-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.name.empty}`
      );
    });

    test('Name displays error if changed to have less than 2 characters', async () => {
      render(<SignupForm />);

      // Type in 1-character name
      userEvent.type(screen.getByLabelText('Name'), 'J');

      // Wait for error message to display
      await waitFor(() => {
        expect(screen.getByTestId('name-error-msg')).not.toBeEmptyDOMElement();
      });

      // Check content of error message
      expect(screen.getByTestId('name-error-msg')).toHaveTextContent(
        errors.name.tooShort
      );
      expect(screen.getByTestId('name-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.name.tooShort}`
      );
    });

    // Because the name input, in addition to the other inputs on this form,
    // is empty by default, typing something in and then clearing it before
    // blurring the input will effectively call the onChange function in any
    // case. Thus, I won't be testing the onBlur for such a case.

    test('Name does not show error message if input is at least two characters', () => {
      render(<SignupForm />);

      // Type two-letter name into name field
      userEvent.type(screen.getByLabelText('Name'), 'Ju');
      userEvent.tab();

      // Expect there to be no error messages displayed
      expect(screen.getByTestId('name-error-msg')).toBeEmptyDOMElement();
      expect(screen.getByTestId('name-error-msg-sr')).toBeEmptyDOMElement();
    });

    test('Email displays error if changed to empty', async () => {
      render(<SignupForm />);

      // Enter valid input, then clear it
      userEvent.type(screen.getByLabelText('Email'), 'juno@domain.tld');
      userEvent.clear(screen.getByLabelText('Email'));

      // Wait for error message to display
      await waitFor(() => {
        expect(screen.getByTestId('email-error-msg')).not.toBeEmptyDOMElement();
      });

      // Check content of error message
      expect(screen.getByTestId('email-error-msg')).toHaveTextContent(
        errors.email.empty
      );
      expect(screen.getByTestId('email-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.email.empty}`
      );
    });

    test('Email displays error if left empty', () => {
      render(<SignupForm />);

      // Put email field in focus
      userEvent.click(screen.getByLabelText('Email'));
      expect(screen.getByLabelText('Email')).toHaveFocus();

      // Tab out of email field
      userEvent.tab();

      // Check content of error message
      expect(screen.getByTestId('email-error-msg')).toHaveTextContent(
        errors.email.empty
      );
      expect(screen.getByTestId('email-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.email.empty}`
      );
    });

    test('Email displays error if invalid address is entered', async () => {
      render(<SignupForm />);

      // Enter invalid email address
      userEvent.type(screen.getByLabelText('Email'), 'juno@domain');

      // Wait for error message to display
      await waitFor(() => {
        expect(screen.getByTestId('email-error-msg')).not.toBeEmptyDOMElement();
      });

      // Check content of error message
      expect(screen.getByTestId('email-error-msg')).toHaveTextContent(
        errors.email.invalid
      );
      expect(screen.getByTestId('email-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.email.invalid}`
      );
    });

    test('Email does not show error message if valid address is entered', () => {
      render(<SignupForm />);

      // Enter valid email address
      userEvent.type(screen.getByLabelText('Email'), 'juno@domain.tld');
      userEvent.tab();

      // Expect there to be no error messages displayed
      expect(screen.getByTestId('email-error-msg')).toBeEmptyDOMElement();
      expect(screen.getByTestId('email-error-msg')).toBeEmptyDOMElement();
    });

    test('Password displays error if changed to empty', async () => {
      render(<SignupForm />);

      // Enter valid input, then clear it
      userEvent.type(screen.getByLabelText('Password'), 'password');
      userEvent.clear(screen.getByLabelText('Password'));

      // Wait for error message to display
      await waitFor(() => {
        expect(
          screen.getByTestId('password-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      // Check content of error message
      expect(screen.getByTestId('password-error-msg')).toHaveTextContent(
        errors.password.empty
      );
      expect(screen.getByTestId('password-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.password.empty}`
      );
    });

    test('Password displays error if left empty', () => {
      render(<SignupForm />);

      // Put password field into focus
      userEvent.click(screen.getByLabelText('Password'));
      expect(screen.getByLabelText('Password')).toHaveFocus();

      // Tab out of password field
      userEvent.tab();

      // Check content of error message
      expect(screen.getByTestId('password-error-msg')).toHaveTextContent(
        errors.password.empty
      );
      expect(screen.getByTestId('password-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.password.empty}`
      );
    });

    test('Password displays error if password with fewer than 8 characters is entered', async () => {
      render(<SignupForm />);

      // Enter 7-character password
      userEvent.type(screen.getByLabelText('Password'), 'passwor');

      // Wait for error message to display
      await waitFor(() => {
        expect(
          screen.getByTestId('password-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      // Check content of error message
      expect(screen.getByTestId('password-error-msg')).toHaveTextContent(
        errors.password.tooShort
      );
      expect(screen.getByTestId('password-error-msg-sr')).toHaveTextContent(
        `input error: ${errors.password.tooShort}`
      );
    });

    test('Password does not show error message if password with at least 8 characters is entered', () => {
      render(<SignupForm />);

      // Enter password with 8 characters
      userEvent.type(screen.getByLabelText('Password'), 'password');
      userEvent.tab();

      // Expect there to be no error messages displayed
      expect(screen.getByTestId('password-error-msg')).toBeEmptyDOMElement();
      expect(screen.getByTestId('password-error-msg-sr')).toBeEmptyDOMElement();
    });

    test('ConfirmPassword displays error if changed to empty', async () => {
      render(<SignupForm />);

      // Enter password
      userEvent.type(screen.getByLabelText('Password'), 'password');

      // Enter password again, then clear it
      userEvent.type(screen.getByLabelText('Confirm Password'), 'password');
      userEvent.clear(screen.getByLabelText('Confirm Password'));

      // Wait for error message to display
      await waitFor(() => {
        expect(
          screen.getByTestId('confirmPassword-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      // Check content of error message
      expect(screen.getByTestId('confirmPassword-error-msg')).toHaveTextContent(
        errors.confirmPassword.empty
      );
      expect(
        screen.getByTestId('confirmPassword-error-msg-sr')
      ).toHaveTextContent(`input error: ${errors.confirmPassword.empty}`);
    });

    test('ConfirmPassword displays error if left empty', () => {
      render(<SignupForm />);

      // Enter password
      userEvent.type(screen.getByLabelText('Password'), 'password');

      // Put confirm password field in focus
      userEvent.click(screen.getByLabelText('Confirm Password'));
      expect(screen.getByLabelText('Confirm Password')).toHaveFocus();

      // Tab out of confirm password field
      userEvent.tab();

      // Check content of error message
      expect(screen.getByTestId('confirmPassword-error-msg')).toHaveTextContent(
        errors.confirmPassword.empty
      );
      expect(
        screen.getByTestId('confirmPassword-error-msg-sr')
      ).toHaveTextContent(`input error: ${errors.confirmPassword.empty}`);
    });

    test('Confirm Password displays error if input does not match entered password', async () => {
      render(<SignupForm />);

      // Enter password
      userEvent.type(screen.getByLabelText('Password'), 'password');

      // Enter password that doesn't match in confirm password field
      userEvent.type(screen.getByLabelText('Confirm Password'), 'notthesame');

      // Wait for error message to display
      await waitFor(() => {
        expect(
          screen.getByTestId('confirmPassword-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      // Check content of error message
      expect(screen.getByTestId('confirmPassword-error-msg')).toHaveTextContent(
        errors.confirmPassword.notMatch
      );
      expect(
        screen.getByTestId('confirmPassword-error-msg-sr')
      ).toHaveTextContent(`input error: ${errors.confirmPassword.notMatch}`);
    });

    test('Confirm Password displays error on change if Password was left empty', async () => {
      render(<SignupForm />);

      // Leave password field empty and start typing in confirm password field
      userEvent.type(screen.getByLabelText('Confirm Password'), 'p');

      // Wait for error message to display
      await waitFor(() => {
        expect(
          screen.getByTestId('confirmPassword-error-msg')
        ).not.toBeEmptyDOMElement();
      });

      // Check content of error message
      expect(screen.getByTestId('confirmPassword-error-msg')).toHaveTextContent(
        errors.confirmPassword.noPassword
      );
      expect(
        screen.getByTestId('confirmPassword-error-msg-sr')
      ).toHaveTextContentq(`input error: ${errors.confirmPassword.noPassword}`);
    });
  });
});
