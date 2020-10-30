import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { font } from '../../shared/theme';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

const FormContainer = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 6rem;
  border: 0.5px solid #fff;
  border-radius: 36px;
  box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  position: relative;

  & h1 {
    font-size: ${(props) => props.titleSize};
    font-weight: ${font.weight.semibold};
  }

  & h2 {
    font-size: 1.5rem;
    font-weight: ${font.weight.normal};
    text-align: center;
    margin-top: 0.1rem;
  }

  & .form-error {
    width: 100%;
    text-align: center;
    padding: 1rem 0 1.5rem;
    color: #df0000;
    font-weight: ${font.weight.medium};
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Form = ({
  title,
  subtitle,
  titleSize,
  buttonText,
  buttonSize,
  submitEnabled,
  showLogo,
  width,
  onFormSubmit,
  children
}) => {
  const onSubmit = (event) => {
    event.preventDefault();

    onFormSubmit();
  };

  return (
    <FormContainer titleSize={titleSize} width={width}>
      {showLogo && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
          <Logo size="6.375rem" position="relative" />
        </div>
      )}
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      <StyledForm onSubmit={onSubmit}>
        {children}
        <Button
          type="submit"
          text={buttonText}
          variant="primary"
          size={buttonSize}
          disabled={!submitEnabled}
        />
      </StyledForm>
    </FormContainer>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleSize: PropTypes.string,
  buttonText: PropTypes.string,
  buttonSize: PropTypes.string,
  submitEnabled: PropTypes.bool,
  showLogo: PropTypes.bool,
  width: PropTypes.string,
  onFormSubmit: PropTypes.func
};

Form.defaultProps = {
  title: 'Form',
  subtitle: '',
  titleSize: '1.5rem',
  buttonText: 'Submit',
  buttonSize: 'normal',
  submitEnabled: true,
  showLogo: false,
  width: '35.75rem',
  onFormSubmit: () => {}
};

export default Form;
