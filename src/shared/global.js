import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

import { font } from './theme';

export const fontUrl =
  '<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">';

export const rootStyles = css`
  font-size: 16px;

  @media (max-width: 1020px) {
    font-size: 14px;
  }

  @media (max-width: 510px) {
    font-size: 12px;
  }
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

  body.using-mouse :focus {
    outline: none;
  }

  body .visually-hidden {
    border: 0;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;
