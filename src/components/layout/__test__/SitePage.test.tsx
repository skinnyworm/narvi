/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { AppProvider } from 'app/helpers';
import SitePage from '../SitePage';

describe(SitePage, () => {
  test.only('it should be defined', () => {
    expect(SitePage).toBeDefined();
    render(
      <AppProvider>
        <SitePage>test</SitePage>
      </AppProvider>,
    );
  });
});
