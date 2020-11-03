import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import logo from '../../assets/logo_colored.svg';

const AbsolutePosition = css`
  position: absolute;
  left: 50%;
`;

export const StyledLogo = styled.img`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  ${(props) =>
    props.position === 'absolute' &&
    AbsolutePosition} @media
    (max-width: 1024px) {
    display: none;
  }
`;

const Logo = ({ size, position }) => {
  return <StyledLogo size={size} src={logo} position={position}></StyledLogo>;
};

Logo.propTypes = {
  size: PropTypes.string,
  position: PropTypes.string
};

Logo.defaultProps = {
  size: '2.625rem',
  position: 'absolute'
};

export default Logo;
