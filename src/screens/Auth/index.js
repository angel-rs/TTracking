import React, { Component } from 'react';
import { View, Image, AsyncStorage } from 'react-native';
import { Button, Text, Input } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import * as firebase from 'firebase';

import NavBar from '../../components/NavBar';
import Loader from '../../components/Loader';
import Layouts from '../../constants/Layouts';
import Logo from '../../../assets/images/icon.png';

import styles from './styles';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.navigation = props.navigation;
  }

  componentWillMount = async () => {
    const value = await AsyncStorage.getItem('loggedIn');

    if (value !== null) {
      if (value === 'TRUE') {
        this.navigation.navigate('Home');
        return;
      }
    }

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <View style={[{ flex: 1 }, Layouts.center]}>
          <Loader />
        </View>
      )
    }

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

          <Col style={styles.buttonsSection} size={15}>
            <Button transparent rounded full onPress={() => { this.navigation.navigate('Login'); }}>
              <Text>
                Entrar
              </Text>
            </Button>

            <Button rounded full onPress={() => { this.navigation.navigate('Signup'); }}>
              <Text>
                Registro
              </Text>
            </Button>
          </Col>
        </Col>
      </View>
    );
  }
}

export default Auth;
