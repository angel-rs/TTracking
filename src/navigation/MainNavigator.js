import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Tracking from '../screens/Tracking';

export default createStackNavigator({
  Home,
  Tracking,
}, {
  headerMode: 'none',
});
