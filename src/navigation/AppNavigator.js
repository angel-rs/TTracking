import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainNavigator from './MainNavigator';
import LoginNavigator from './LoginNavigator';

const AppNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  App: MainNavigator,
});

export default createAppContainer(AppNavigator);
