import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';

import NavBar from '../../components/NavBar';
import Layouts from '../../constants/Layouts';
import Logo from '../../../assets/images/icon.png';

import styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  logIn = () => {
    this.navigation.navigate('App');
  }

  render() {
    return (
      <View style={Layouts.container}>
        <NavBar title="Iniciar sesión" />

        <Col style={styles.content}>

          <Col style={Layouts.center} size={50}>
            <Image style={styles.logo} source={Logo} />

            <Text>
              TTracking
            </Text>
            <Text>
              Just in time
            </Text>
          </Col>

          <Row size={20} />

          <Col style={styles.buttonsSection} size={30}>
            <Button rounded full onPress={this.logIn}>
              <Text>
                Continuar con Facebook
              </Text>
            </Button>

            <Button rounded full onPress={this.logIn}>
              <Text>
                Continuar con Twitter
              </Text>
            </Button>

            <Button rounded full onPress={this.logIn}>
              <Text>
                Continuar con Google
              </Text>
            </Button>
          </Col>
        </Col>
      </View>
    );
  }
}

export default Login;
