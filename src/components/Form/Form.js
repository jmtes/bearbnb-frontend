import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { font } from '../../shared/theme';

const FormContainer = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Form = ({
  width,
  title,
  titleSize,
  onFormSubmit,
  subtitle,
  children
}) => {
  const onSubmit = (event) => {
    event.preventDefault();

    onFormSubmit();
  };

  return (
    <FormContainer titleSize={titleSize} width={width}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
    </FormContainer>
  );
};

Form.propTypes = {
  width: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleSize: PropTypes.string,
  subtitle: PropTypes.string,
  onFormSubmit: PropTypes.func
};

Form.defaultProps = {
  width: '35.75rem',
  titleSize: '1.5rem',
  subtitle: '',
  onFormSubmit: () => {}
};

export default Form;
