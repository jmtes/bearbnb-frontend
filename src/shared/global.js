import { createGlobalStyle, css } from 'styled-components';
import { font } from './theme';

export const fontUrl =
  '<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">';

export const rootStyles = css`
  font-size: calc(1vw + 1vh + 0.5vmin);
`;

export const bodyStyles = css`
  height: 100vh;
  width: 100vw;
  font-family: ${font.family.primary};
`;

export const GlobalStyle = createGlobalStyle`
  html {	
    ${rootStyles}	
  }

  body {
    ${bodyStyles}
  }
`;
