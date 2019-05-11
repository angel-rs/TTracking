import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Home from '../screens/Home';

export default createStackNavigator({
  Home,
}, {
  headerMode: 'none',
});
