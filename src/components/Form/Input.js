import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { font } from '../../shared/theme';

const InputWrapper = styled.div`
  margin: 1rem 0;
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.75rem;
  border: 1.15px solid #fff;
  box-shadow: 0px 2px 8px 4px
    ${(props) => (props.error ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)')};
  font-weight: ${font.weight.medium};
  font-size: 1.125rem;
  transition: box-shadow 0.25s ease;
  overflow: hidden;

  &:focus-within {
    box-shadow: 0px 2px 8px 4px
      ${(props) =>
        props.error ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)'};
  }

  & label,
  & input,
  & ::placeholder {
    margin: 0.15rem 0;
  }

  & label {
    letter-spacing: 0.06rem;
    color: #605c54;
  }

  & label span {
    color: red;
    margin-left: 1rem;
    font-size: 1rem;
  }

  & input,
  & ::placeholder {
    letter-spacing: 0.04rem;
    font-size: 1.25rem;
    font-weight: ${font.weight.medium};
    background-color: inherit;
  }

  & input {
    border: 0;
    padding: 0;
    transition: all 0.075s linear;
    color: #403c34;
    transform: scale(1);
    transform-origin: left center;
    max-width: 100%;
  }

  & input[type='number'] {
    width: 15%;
  }

  & input:focus {
    transform: scale(1.1);
  }

  & ::placeholder {
    color: #9d9480;
  }
`;

const Input = ({
  id,
  label,
  type,
  placeholder,
  validateInput,
  options,
  width,
  borderRadius
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = (event) => {
    setError(validateInput(event.target.value));
  };

  return (
    <InputWrapper width={width} borderRadius={borderRadius} error={!!error}>
      <label htmlFor={id}>
        {label} <span aria-hidden="true">{error && error}</span>
        <span aria-live="assertive" className="visually-hidden">
          {error && `input error: ${error}`}
        </span>
      </label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event)}
        onBlur={(event) => onBlur(event)}
        {...options}></input>
    </InputWrapper>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validateInput: PropTypes.func,
  options: PropTypes.object,
  width: PropTypes.string,
  borderRadius: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  validateInput: () => {},
  options: {},
  width: '100%',
  borderRadius: '12px'
};

export default Input;
