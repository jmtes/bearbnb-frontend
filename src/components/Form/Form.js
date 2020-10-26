import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { font } from '../../shared/theme';

const FormContainer = styled.div`
  width: ${(props) => props.width};
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 4rem;
  border: 0.5px solid #fff;
  border-radius: 36px;
  box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);

  & h1 {
    font-size: ${(props) => props.titleSize};
    font-weight: ${font.weight.semibold};
  }

  & h2 {
    font-size: 1.25rem;
    font-weight: ${font.weight.normal};
  }

  & .form-error {
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    color: #df0000;
    font-weight: ${font.weight.medium};
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Form = ({
  width,
  title,
  titleSize,
  buttonText,
  onFormSubmit,
  subtitle,
  children
}) => {
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    const inputs = Array.from(event.target.querySelectorAll('input'));
    const errors = Array.from(event.target.querySelectorAll('.error-msg'));

    // Check that all required fields are filled in
    if (inputs.some((input) => input.dataset.required && !input.value)) {
      const requiredFields = inputs
        .filter((input) => input.dataset.required && !input.value)
        .map((input) => input.id.charAt(0).toUpperCase() + input.id.slice(1));
      setError(
        `Please fill in the following fields: ${requiredFields.join(', ')}`
      );
    }
    // Check if there are any errors
    // If so, ask user to fix them
    else if (errors.some((error) => error.innerText))
      setError('Please fix all errors before submitting.');
    else {
      setError(null);

      // Put all input values into object
      const inputValues = {};

      inputs.forEach((input) => {
        // If the input is of type number, convert it into a number
        const value =
          input.type === 'number' ? parseFloat(input.value) : input.value;

        inputValues[input.id] = value;
      });

      onFormSubmit(inputValues);
    }
  };

  return (
    <FormContainer titleSize={titleSize} width={width}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      <StyledForm onSubmit={(event) => onSubmit(event)}>
        {children}
        <span aria-live="assertive" className="form-error">
          {error}
        </span>
        <button type="submit">{buttonText}</button>
      </StyledForm>
    </FormContainer>
  );
};

Form.propTypes = {
  width: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleSize: PropTypes.string,
  subtitle: PropTypes.string,
  buttonText: PropTypes.string,
  onFormSubmit: PropTypes.func
};

Form.defaultProps = {
  width: '35.75rem',
  titleSize: '1.5rem',
  subtitle: '',
  buttonText: 'Submit',
  onFormSubmit: () => {}
};

export default Form;
