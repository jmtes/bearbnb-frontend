import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { font } from '../../shared/theme';

import Logo from '../Logo/Logo';
import User from '../User/User';

const StyledHeader = styled.header`
  max-width: 1920px;
  padding: 1rem 0.75rem 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: #fff;
`;

export const TextLogo = styled.div`
  font-family: ${font.family.logo};
  font-size: 2rem;

  a {
    text-decoration: none;
    color: #403c34;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <TextLogo>
        <Link to="/">bearbnb</Link>
      </TextLogo>
      <Logo />
      <User />
    </StyledHeader>
  );
};

export default Header;
