import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { font } from '../../shared/theme';
import logo from '../../assets/logo_colored.svg';

import User from '../User/User';

const StyledHeader = styled.header`
  max-width: 1920px;
  padding: 1rem 0.75rem 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const TextLogo = styled.div`
  font-family: ${font.family.logo};
  font-size: 2rem;

  a {
    text-decoration: none;
    color: #403c34;
  }
`;

const Logo = styled.img`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  position: absolute;
  left: 50%;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <TextLogo>
        <Link to="/">bearbnb</Link>
      </TextLogo>
      <Logo size={'2.625rem'} src={logo} />
      <User />
    </StyledHeader>
  );
};

export default Header;
