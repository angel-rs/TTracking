import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Auth from '../screens/Auth';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

export default createStackNavigator({
  Auth,
  Login,
  Signup,
}, {
  headerMode: 'none',
});
