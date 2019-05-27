import React, { Component } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image, AsyncStorage, Dimensions } from 'react-native';
import { Button, Text, Input } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import * as firebase from 'firebase';

import NavBar from '../../components/NavBar';
import Loader from '../../components/Loader';
import Layouts from '../../constants/Layouts';
import Logo from '../../../assets/images/icon.png';

const {
  width: deviceWidth,
} = Dimensions.get('window');

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
            <View style={{ flex: 0, position: 'absolute', width: deviceWidth, }}>
              <MaterialCommunityIcons name="email-check-outline" size={36} style={{ color: '#d6d6d6', left: -deviceWidth * 0.02, top: deviceWidth * 0.18 }} />
              <MaterialCommunityIcons name="cellphone-message" size={36} style={{ color: '#d6d6d6', left: deviceWidth * 0.24 }} />
              <MaterialCommunityIcons name="clock-alert-outline" size={36} style={{ color: '#d6d6d6', left: deviceWidth * 0.14, top: deviceWidth * 0.08 }} />
              <MaterialCommunityIcons name="laptop" size={36} style={{ color: '#d6d6d6', left: deviceWidth * 0.69, top: -deviceWidth * 0.24 }} />
              <MaterialCommunityIcons name="comment-check-outline" size={36} style={{ color: '#d6d6d6', left: deviceWidth * 0.74, top: -deviceWidth * 0.16 }} />
              <MaterialCommunityIcons name="wallet-travel" size={36} style={{ color: '#d6d6d6', left: deviceWidth * 0.88, top: -deviceWidth * 0.38 }} />
            </View>

            <Image style={styles.logo} source={Logo} />

            <Text style={{ color: '#7a7a7a', marginTop: 10 }}>
              TTracking
            </Text>
            <Text style={{ color: '#959595' }}>
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
