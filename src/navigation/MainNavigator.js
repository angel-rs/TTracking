import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Tracking from '../screens/Tracking';
import Reports from '../screens/Reports';
import Historic from '../screens/Historic';
import AddManual from '../screens/AddManual';

export default createStackNavigator({
  Home,
  Tracking,
  Reports,
  Historic,
  AddManual,
}, {
  headerMode: 'none',
});
