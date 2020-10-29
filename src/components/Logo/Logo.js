import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logo from '../../assets/logo_colored.svg';

export const StyledLogo = styled.img`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  position: absolute;
  left: 50%;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Logo = ({ size }) => {
  return <StyledLogo size={size} src={logo}></StyledLogo>;
};

Logo.propTypes = {
  size: PropTypes.string
};

Logo.defaultProps = {
  size: '2.625rem'
};

export default Logo;
