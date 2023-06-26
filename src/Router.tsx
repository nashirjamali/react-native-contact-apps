import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import Form from './screens/Form';
import List from './screens/List';
import ChooseAvatar from './screens/ChooseAvatar';
import Detail from './screens/Detail';

const Stack = createStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseAvatar"
        component={ChooseAvatar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Form"
        component={Form}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="List"
        component={List}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
