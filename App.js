import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Container, StyleProvider, Root } from 'native-base';
import { AppLoading, Asset, Font, Constants } from 'expo';
import getTheme from './src/theme/components';
import { Ionicons } from '@expo/vector-icons';

import Colors from './src/constants/Colors';
import AppNavigator from './src/navigation/AppNavigator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        ...Ionicons.font,
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { skipLoadingScreen } = this.props;
    const { isLoadingComplete } = this.state;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="#63C6F7" barStyle="light-content" />

        <StyleProvider style={getTheme()}>
          <Container>
            <Root>
              <AppNavigator />
            </Root>
          </Container>
        </StyleProvider>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.tintColor,
    paddingTop:  Constants.statusBarHeight,
  }
};

export default App;
