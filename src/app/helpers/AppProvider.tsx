import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LocationProvider, createMemorySource, createHistory } from '@reach/router';
import { RootState } from 'app/store';

import { initialState } from './mocks';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import { MemoryRouter } from 'react-router';

const mockStore = configureStore([]);

export type AppProviderProps = {
  path?: string;
  state?: RootState;
  children: React.ReactNode;
};

export const AppProvider = (props: AppProviderProps) => {
  const { path = '/', state = initialState, children } = props;
  const source = createMemorySource(path);
  const history = createHistory(source);
  history.listen(() => console.log('message arrived at router', source.location));
  const store = mockStore(state);
  return (
    <LocationProvider history={history}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[path]}>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      </ThemeProvider>
    </LocationProvider>
  );
};
