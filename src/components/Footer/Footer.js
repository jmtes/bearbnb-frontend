import React from 'react';
import styled from 'styled-components';

import { font } from '../../shared/theme';

const StyledFooter = styled.footer`
  background-color: #403c34;
  color: #fff;
  font-weight: ${font.weight.medium};
  display: flex;
  justify-content: center;
  padding: 2rem;

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #f2cb5e;
    transition: color 0.25s ease;
  }

  a:hover {
    color: #ffeb7e;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        made by <a href="https://github.com/jmtes">juno tesoro</a>
      </p>
    </StyledFooter>
  );
};

export default Footer;
