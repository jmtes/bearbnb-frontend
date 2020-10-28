import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { font } from '../../shared/theme';

import locationIcon from '../../assets/location_icon.svg';
import calendarIcon from '../../assets/calendar_icon.svg';
import personIcon from '../../assets/person_icon.svg';

const Wrapper = styled.div`
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderRadius};
  margin: 0.75rem 0;
  display: inline-flex;
  align-content: center;
  padding: 1.25rem 1.75rem;
  border: 1.15px solid #fff;
  box-shadow: 0px 2px 8px 4px
    ${(props) => (props.error ? 'rgba(223, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)')};
  font-weight: ${font.weight.medium};
  font-size: 1.125rem;
  transition: box-shadow 0.25s ease;
  overflow: hidden;

  & .icon {
    display: flex;
    align-content: center;
    justify-content: center;
    margin-right: 1.75rem;
    width: 2rem;
  }

  & .input {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &:focus-within {
    box-shadow: 0px 2px 8px 4px
      ${(props) =>
        props.error ? 'rgba(223, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)'};
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
    color: #df0000;
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

  & input[type='number'],
  & input[type='number']:focus {
    width: 15%;
  }

  & input:focus {
    transform: scale(1.1);
    width: 90%;
  }

  & ::placeholder {
    color: #9d9480;
  }

  & .DayPickerInput-OverlayWrapper {
    position: absolute;
    border-radius: ${(props) => props.borderRadius};
  }

  & .DayPickerInput-Overlay {
    border-radius: ${(props) => props.borderRadius};
  }

  & .DayPicker-Day--today {
    color: #478170;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    position: relative;

    background-color: #478170;
    color: #fff;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: #478170;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background-color: rgba(119, 177, 160, 0.25);
  }
`;

const Input = ({
  id,
  label,
  type,
  placeholder,
  options,
  width,
  borderRadius,
  icon,
  value,
  error,
  onChange,
  onBlur
}) => {
  const validIcons = ['location', 'calendar', 'person'];

  return (
    <Wrapper width={width} borderRadius={borderRadius} error={!!error}>
      {validIcons.includes(icon) && (
        <div className="icon" aria-hidden="true">
          {icon === 'location' && <img src={locationIcon} />}
          {icon === 'calendar' && <img src={calendarIcon} />}
          {icon === 'person' && <img src={personIcon} />}
        </div>
      )}
      <div className="input">
        <label htmlFor={id}>
          {label}
          <span aria-hidden="true" className="error-msg">
            {error && error}
          </span>
          <span aria-live="assertive" className="visually-hidden">
            {error && `input error: ${error}`}
          </span>
        </label>
        {type === 'date' ? (
          <DayPickerInput
            value={value}
            onDayChange={(day) => {
              onChange({ target: { id, value: day } });
            }}
            inputProps={{
              id,
              autoComplete: 'off',
              'data-isdate': true
            }}
            dayPickerProps={{
              initialMonth: options.firstDay,
              fromMonth: options.firstDay,
              modifiers: { disabled: { before: options.firstDay } },
              showOutsideDays: true
            }}
          />
        ) : (
          <input
            type={type}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event)}
            onBlur={(event) => onBlur(event)}
            {...options}></input>
        )}
      </div>
    </Wrapper>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.object,
  width: PropTypes.string,
  borderRadius: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  options: {},
  width: '100%',
  borderRadius: '12px',
  icon: null,
  value: '',
  error: null,
  onChange: () => {},
  onBlur: () => {}
};

export default Input;
