import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import UserProvider from './UserContext';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <UserProvider>
      <AppNavigator />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;