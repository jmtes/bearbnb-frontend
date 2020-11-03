import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';

import Form from './Form';
import Input from './Input';

// TODO: INTEGRATE WITH REDUX SO THAT SEARCH QUERY CAN BE STORED THERE

const SearchForm = () => {
  const [values, setValues] = useState({
    location: '',
    checkin: new Date(),
    checkout: addDays(new Date(), 1),
    guests: 1
  });
  const [errors, setErrors] = useState({
    location: null,
    checkin: null,
    checkout: null,
    guests: null
  });
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    if (Date.parse(values.checkout) < Date.parse(values.checkin))
      setValues({ ...values, checkout: addDays(values.checkin, 1) });
  }, [values.checkin]);

  useEffect(() => {
    if (
      !values.location ||
      errors.location ||
      errors.checkin ||
      errors.checkout ||
      errors.guests
    )
      setSubmitEnabled(false);
    else setSubmitEnabled(true);
  }, [
    values.location,
    errors.location,
    errors.checkin,
    errors.checkout,
    errors.guests
  ]);

  const validators = {
    location: (input) => (input ? null : 'This field is required'),
    checkin: (input) => {
      if (!Date.parse(input)) return 'Must enter a valid date';
      if (Date.parse(input) < Date.parse(new Date().toDateString()))
        return "Cannot be before today's date";
      return null;
    },
    checkout: (input) => {
      if (!Date.parse(input)) return 'Must enter a valid date';
      if (isBefore(input, values.checkin) && !isSameDay(input, values.checkin))
        return 'Must be after checkin date';
      return null;
    },
    guests: (input) => {
      const num = parseFloat(input);

      return Number.isInteger(num) && num > 0
        ? null
        : 'Must be a positive integer';
    }
  };

  const debouncedValidators = {
    location: debounce(
      (input) => setErrors({ ...errors, location: validators.location(input) }),
      750
    ),
    checkin: debounce(
      (input) => setErrors({ ...errors, checkin: validators.checkin(input) }),
      750
    ),
    checkout: debounce(
      (input) => setErrors({ ...errors, checkout: validators.checkout(input) }),
      750
    ),
    guests: debounce(
      (input) => setErrors({ ...errors, guests: validators.guests(input) }),
      750
    )
  };

  const onFieldChange = ({ target: { id, value } }) => {
    // Update field value
    setValues({ ...values, [id]: value });

    // Wait until user stops typing for long enough before validating input
    debouncedValidators[id](value);
  };

  const onFieldBlur = (event) => {
    // Validate input
    setErrors({
      ...errors,
      [event.target.id]: validators[event.target.id](event.target.value)
    });
  };

  const onFormSubmit = () => {
    const data = {
      location: values.location,
      checkin: new Date(values.checkin.toDateString()).toISOString(),
      checkout: new Date(values.checkout.toDateString()).toISOString(),
      guests: parseInt(values.guests)
    };

    console.log(data);

    // TODO: Dispatch SEARCH_LISTINGS action
    // Redirect to search page
  };

  return (
    <Form
      title="Stay at an Illegal Hotel."
      subtitle="Search through listings in the world's top cities on Bearbnb."
      titleSize="3rem"
      buttonText="Search"
      buttonSize="large"
      width="59.375rem"
      submitEnabled={submitEnabled}
      showLogo={true}
      onFormSubmit={onFormSubmit}>
      <Input
        id="location"
        label="Location"
        type="text"
        placeholder="Los Angeles, California"
        icon="location"
        options={{ autoComplete: 'off' }}
        value={values.location}
        error={errors.location}
        onChange={(event) => onFieldChange(event)}
        onBlur={(event) => onFieldBlur(event)}
      />
      <Input
        id="checkin"
        label="Checkin"
        type="date"
        icon="calendar"
        value={values.checkin}
        error={errors.checkin}
        onChange={(event) => onFieldChange(event)}
        onBlur={(event) => onFieldBlur(event)}
        options={{ firstDay: new Date() }}
      />
      <Input
        id="checkout"
        label="Checkout"
        type="date"
        icon="calendar"
        value={values.checkout}
        error={errors.checkout}
        onChange={(event) => onFieldChange(event)}
        onBlur={(event) => onFieldBlur(event)}
        options={{ firstDay: values.checkin }}
      />
      <Input
        id="guests"
        label="Guests"
        type="number"
        placeholder="1"
        icon="person"
        options={{ min: 1 }}
        value={values.guests}
        error={errors.guests}
        onChange={(event) => onFieldChange(event)}
        onBlur={(event) => onFieldBlur(event)}
      />
      <span
        aria-live="assertive"
        className="form-error"
        data-testid="form-error">
        {(errors.location ||
          errors.checkin ||
          errors.checkout ||
          errors.guests) &&
          'Please fix all errors before submitting.'}
      </span>
    </Form>
  );
};

export default SearchForm;
