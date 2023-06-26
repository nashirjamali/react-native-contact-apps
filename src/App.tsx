import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Router from './Router';

import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): JSX.Element {
  return (
    <Provider store={configureStore}>
      <SafeAreaProvider>
        <NavigationContainer theme={DefaultTheme}>
          <Router />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
