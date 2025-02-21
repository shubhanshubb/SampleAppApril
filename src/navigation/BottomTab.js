import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Play from '../bottomTab/Play';
import Popular from '../bottomTab/Popular';
import Rated from '../bottomTab/Rated';
import Upcoming from '../bottomTab/Upcoming';

const Tab = createBottomTabNavigator();

const icons = {
  Play: 'play',
  Popular: 'popcorn',
  Rated: 'heart-flash',
  Upcoming: 'timelapse',
};

const BottomTab = () => (
  <Tab.Navigator
    initialRouteName="Play"
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => {
        const IconComponent = route.name === 'Play' ? AIcon : MCIcon;
        return (
          <IconComponent
            name={icons[route.name]}
            size={24}
            color={focused ? 'white' : '#A9A9A9'}
          />
        );
      },
      tabBarLabel: ({focused, color}) => (
        <Text
          style={{
            marginTop: 5,
            color: focused ? 'white' : '#A9A9A9',
            fontFamily: focused ? 'sans-serif-medium' : 'sans-serif',
            fontSize: 12,
          }}>
          {route.name}
        </Text>
      ),
      tabBarStyle: {backgroundColor: '#09030E', height: 80},
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name="Play" component={Play} />
    <Tab.Screen name="Popular" component={Popular} />
    <Tab.Screen name="Rated" component={Rated} />
    <Tab.Screen name="Upcoming" component={Upcoming} />
  </Tab.Navigator>
);

export default BottomTab;
