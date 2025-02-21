import {Platform} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTab from './BottomTab';
import Splash from '../Splash';
import Favourite from '../screens/Favourite';
import MovieDetail from '../screens/MovieDetail';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide the header if needed
          // cardStyle: { backgroundColor: "rgba(0,0,0,0.1)" },
          // animationEnabled: "true",
        }}>
        <Stack.Screen
          name="Parent"
          component={Splash}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            headerShown: false,
            gestureEnabled: false,
            tabBarVisible: true,
          }}
        />
        <Stack.Screen
          name="Favourite"
          component={Favourite}
          options={{
            headerShown: false,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{
            headerShown: false,
            gestureEnabled: Platform.OS === "ios" ? true : false,
            animationEnabled: true,
            presentation: Platform.OS === "ios" ? "modal" : "none",
            cardStyle: { backgroundColor: "rgba(0,0,0,0.1)" },
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;