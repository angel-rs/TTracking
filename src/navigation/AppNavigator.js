import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginNavigator from './LoginNavigator';

const AppNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  Main: MainTabNavigator,
});

export default createAppContainer(AppNavigator);
