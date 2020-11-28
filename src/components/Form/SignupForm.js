import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import isEmail from 'validator/lib/isEmail';

import Form from './Form';
import Input from './Input';

const SignupForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null
  });
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const shouldEnableSubmit = !!(
    values.name &&
    values.email &&
    values.password &&
    values.confirmPassword &&
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword
  );

  useEffect(() => {
    if (shouldEnableSubmit) setSubmitEnabled(true);
    else setSubmitEnabled(false);
  }, [shouldEnableSubmit]);

  const validators = {
    name: (input) =>
      input.length >= 2 ? null : 'Must be at least 2 characters',
    email: (input) => (isEmail(input) ? null : 'Invalid email address'),
    password: (input) =>
      input.length >= 8 ? null : 'Must be at least 8 characters',
    confirmPassword: (input, password) =>
      input === password ? null : 'Passwords do not match'
  };

  const debouncedValidators = {
    name: useCallback(
      debounce(
        (input) => setErrors({ ...errors, name: validators.name(input) }),
        750
      ),
      []
    ),
    email: useCallback(
      debounce(
        (input) => setErrors({ ...errors, email: validators.email(input) }),
        750
      ),
      []
    ),
    password: useCallback(
      debounce(
        (input) =>
          setErrors({ ...errors, password: validators.password(input) }),
        750
      ),
      []
    ),
    confirmPassword: useCallback(
      debounce(
        (input, password) =>
          setErrors({
            ...errors,
            confirmPassword: validators.confirmPassword(input, password)
          }),
        750
      ),
      []
    )
  };

  const onFieldChange = ({ target: { id, value } }) => {
    // Update field value
    setValues({ ...values, [id]: value });

    // Wait until user stops typing for long enough before validating input
    if (id === 'confirmPassword')
      debouncedValidators[id](value, values.password);
    else debouncedValidators[id](value);
  };

  const onFieldBlur = ({ target: { id, value } }) => {
    // Validate input
    if (id === 'confirmPassword')
      setErrors({ ...errors, [id]: validators[id](value, values.password) });
    else setErrors({ ...errors, [id]: validators[id](value) });
  };

  const onFormSubmit = () => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password
    };

    console.log(data);

    // TODO: Dispatch SIGN_UP action
    // Redirect to user dashboard if successful
    // Otherwise show error
  };

  return (
    <Form
      title="Sign up"
      titleSize="1.75rem"
      buttonText="Create Account"
      buttonSize="large"
      submitEnabled={submitEnabled}
      onFormSubmit={onFormSubmit}>
      <Input
        id="name"
        label="Name"
        type="text"
        placeholder="Rick"
        options={{ autoComplete: 'off' }}
        value={values.name}
        error={errors.name}
        onChange={(event) => onFieldChange(event)}
        onBlur={(event) => onFieldBlur(event)}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="rick@gmail.com"
        value={values.email}
        error={errors.email}
        onChange={(event) => onFieldChange(event)}
        onBlur={(event) => onFieldBlur(event)}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Must be at least 8 characters"
        value={values.password}
        error={errors.password}
        onChange={(event) => onFieldChange(event)}
        onBlur={(event) => onFieldBlur(event)}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Must match previous field"
        value={values.confirmPassword}
        error={errors.confirmPassword}
        onChange={(event) => onFieldChange(event)}
        onBlur={(event) => onFieldBlur(event)}
      />
      <span
        aria-live="assertive"
        className="form-error"
        data-testid="form-error">
        {(errors.name ||
          errors.email ||
          errors.password ||
          errors.confirmPassword) &&
          'Please fix all errors before submitting.'}
      </span>
    </Form>
  );
};

export default SignupForm;
