import React, {PropsWithChildren} from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.

export function renderWithProviders(
  ui: React.ReactElement,
  {store = configureStore, ...renderOptions} = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
