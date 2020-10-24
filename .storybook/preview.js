import React, { Fragment } from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { GlobalStyle } from '../src/shared/global';

const customViewports = {
  desktopXL: {
    name: 'Desktop Extra Large',
    styles: {
      width: '1920px',
      height: '1020px'
    }
  }
};

export const decorators = [
  (Story) => (
    <Fragment>
      <GlobalStyle />
      <Story />
    </Fragment>
  )
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: { ...MINIMAL_VIEWPORTS, ...customViewports },
    defaultViewport: 'desktopXL'
  }
};
