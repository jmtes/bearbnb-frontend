import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { font } from '../../shared/theme';

const PrimaryHover = css`
  &:enabled:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  &:enabled::before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(270deg, #6a978a -10%, rgba(126, 183, 166, 0.5) 155%), #77b1a0;
    border-radius: inherit;
    z-index: -1;
    transition: opacity 0.5s ease;
    opacity: 0;
    }};
  }

  &:enabled:hover::before {
    opacity: 1;
  }
`;

const SecondaryActive = css`
  &:enabled:active {
    background: #fcfcfc;
    padding-top: 1.0625rem;
    box-shadow: 0px 0px 8px rgba(129, 129, 129, 0.2),
      inset 0px 4px 4px rgba(0, 0, 0, 0.1);
  }
`;

const StyledButton = styled.button`
  border: ${(props) => (props.variant === 'primary' ? '0' : '1px solid #fff')};
  min-width: ${(props) =>
    props.size === 'large'
      ? '20.375rem'
      : props.size === 'normal'
      ? '18.125rem'
      : '16rem'};
  font-size: ${(props) => (props.size === 'large' ? '1.25rem' : '1.125rem')};
  font-weight: ${(props) =>
    props.size === 'large' ? font.weight.semibold : font.weight.medium};
  color: ${(props) =>
    props.variant === 'primary' ? '#fff' : 'rgba(64, 60, 52, 0.75)'};
  background: ${(props) =>
    props.variant === 'primary'
      ? 'linear-gradient(90deg, rgba(150, 219, 199, 0.5) 0%, #547c71 100%), #77b1a0'
      : '#fff'};
  letter-spacing: 0.04em;
  padding: 1rem 0;
  border-radius: ${(props) => (props.variant === 'primary' ? '12px' : '36px')};
  box-shadow: ${(props) =>
    props.variant === 'primary'
      ? '0px 2px 4px rgba(0, 0, 0, 0.25)'
      : '0px 2px 8px rgba(129, 129, 129, 0.25), inset 0px 2px 2px rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
  z-index: 1;
  position: relative;
  transition: all ${(props) =>
    props.variant === 'primary' ? '0.25s' : '0.1s'} ease;

  &:disabled {
    cursor: not-allowed;
    border: none;
    color: #fff;
  }

  &:disabled::before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${(props) =>
      props.variant === 'primary' ? 'lightgray' : 'gray'};
    border-radius: inherit;
    z-index: -1;
    transition: opacity 0.5s ease;
    opacity: ${(props) => (props.variant === 'primary' ? '0.75' : '0.25')};
    }};
  }

  ${(props) => props.variant === 'primary' && PrimaryHover}
  ${(props) => props.variant === 'secondary' && SecondaryActive}
`;

const validVariants = ['primary', 'secondary'];
const validSizes = ['large', 'normal', 'small'];

const Button = ({ text, variant, size, disabled, onClick }) => {
  if (!validVariants.includes(variant)) variant = 'primary';
  if (!validSizes.includes(size)) size = 'normal';

  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}>
      {text}
    </StyledButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  text: 'Click',
  variant: 'primary',
  size: 'normal',
  disabled: false,
  onClick: () => {}
};

export default Button;
