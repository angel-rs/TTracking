import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {
  Header,
  View,
  Left,
  Right,
  Body,
  Text,
  Title,
  Icon,
  ActionSheet,
} from 'native-base';

import styles from './styles';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  goBack = () => {
    const { goBackBefore } = this.props;

    if (goBackBefore) {
      const shouldGoBack = goBackBefore();

      if (shouldGoBack) {
        this.navigation.goBack();
      }

      return;
    }

    this.navigation.goBack();
  }

  onMenuOptionPress = async (index) => {
    const { options } = this.props;
    const option = options[index];

    if (option) {
      if (option.toUpperCase() === 'CERRAR SESIÓN') {
        await AsyncStorage.setItem('loggedIn', 'FALSE');
        this.navigation.navigate('Login');
        return;
      }

      if (option.toUpperCase() === 'AGREGAR MANUALMENTE') {
        this.navigation.navigate('AddManual');
        return;
      }
    }
  }

  showMenu = () => {
    const { options } = this.props;

    const actionSheet = {
      options,
      title: "Menu",
    };

    ActionSheet.show(actionSheet, this.onMenuOptionPress);
  }

  render() {
    const {
      goBack,
      menu,
      title,
      options,
    } = this.props;

    return (
      <Header noLeft={!goBack} noShadow style={styles.header}>
        <Left style={styles.left}>
          {
            goBack && (
              <TouchableOpacity activeOpacity={0.9} style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }} onPress={this.goBack}>
                <Icon name="arrow-back" style={styles.icon} size={23} />
              </TouchableOpacity>
            )
          }
        </Left>

        <Body>
          <Title>
            { title }
          </Title>
        </Body>

        <Right style={styles.right}>
          {
            menu && (
              <TouchableOpacity activeOpacity={0.9} style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }} onPress={this.showMenu}>
                <Entypo name="dots-three-vertical" style={styles.icon} size={23} />
              </TouchableOpacity>
            )
          }
        </Right>
      </Header>
    );
  }
}

export default withNavigation(NavBar);
