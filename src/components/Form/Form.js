import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { font } from '../../shared/theme';

const FormContainer = styled.form`
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
`;

const Form = ({ width, title, titleSize, subtitle, children }) => {
  return (
    <FormContainer titleSize={titleSize} width={width}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {children}
    </FormContainer>
  );
};

Form.propTypes = {
  width: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleSize: PropTypes.string,
  subtitle: PropTypes.string
};

Form.defaultProps = {
  width: '35.75rem',
  titleSize: '1.5rem',
  subtitle: ''
};

export default Form;
