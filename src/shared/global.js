import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

import { font } from './theme';

export const fontUrl =
  '<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">';

export const rootStyles = css`
  font-size: 16px;
`;

export const bodyStyles = css`
  height: 100vh;
  width: 100vw;
  font-family: ${font.family.primary};
  color: #403c34;
`;

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {	
    ${rootStyles}	
  }

  body {
    ${bodyStyles}
  }
`;
