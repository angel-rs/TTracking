import React, { Component, Fragment } from 'react';
import { Button, Text, Input, Item, Label, Toast } from 'native-base';
import { View, Image, Modal, Dimensions, AsyncStorage } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import * as firebase from 'firebase';
import conf from '../../../conf';

import NavBar from '../../components/NavBar';
import Loader from '../../components/Loader';
import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';

import styles from './styles';
const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggingIn: false,
    },
    this.navigation = props.navigation;
  }

  logIn = async () => {
    const { email, password } = this.state;

    if (!email) {
      Toast.show({
        text: 'Te ha faltado escribir el correo',
        buttonText: 'Ok',
        position: "top",
        type: 'warning',
        duration: 5000
      });
      return;
    }

    if (!password) {
      Toast.show({
        text: 'Te ha faltado escribir tu constraseña',
        buttonText: 'Ok',
        position: "top",
        type: 'warning',
        duration: 5000
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        text: 'Contraseña invalida',
        buttonText: 'Ok',
        position: "top",
        type: 'warning',
        duration: 5000
      });
      return;
    }

    if (!emailRegexp.test(email)) {
      Toast.show({
        text: 'Correo eléctronico invalido',
        buttonText: 'Ok',
        position: "top",
        type: 'warning',
        duration: 5000
      });
      return;
    }

    this.setState({ loggingIn: true });

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      firebase.auth().onAuthStateChanged((user) => {
        setTimeout(() => {
          this.setState({ loggingIn: false });
          AsyncStorage.setItem('loggedIn', 'TRUE');
          this.navigation.navigate('Home');
        }, 2000);
      })
    } catch (error) {
      console.log(error.toString(error));
      if (error.toString(error) === 'Error: The password is invalid or the user does not have a password.') {
        Toast.show({
          text: 'Contraseña invalida',
          buttonText: 'Ok',
          position: "top",
          type: 'danger',
          duration: 5000
        });
      } else {
        Toast.show({
          text: 'Ha ocurrido un error inesperado',
          buttonText: 'Ok',
          position: "top",
          type: 'danger',
          duration: 5000
        });
      }

      this.setState({ loggingIn: false });
    }
  };

  render() {
    const { loggingIn } = this.state;

    return (
      <Fragment>
        <View style={Layouts.container}>
          <NavBar goBack title="Entrar" />

          <Col style={styles.content}>
            <Item floatingLabel>
              <Label style={{ color: 'gray' }}>
                Correo eléctronico
              </Label>
              <Input
                selectionColor={Colors.tintColor}
                style={{ color: '#2a2a2a', marginLeft: 5 }}
                onChangeText={(email) => { this.setState({ email }) }}
              />
            </Item>

            <Item floatingLabel style={{ marginTop: 20, marginBottom: 40 }}>
              <Label style={{ color: 'gray' }}>
                Contraseña
              </Label>
              <Input
                secureTextEntry
                selectionColor={Colors.tintColor}
                style={{ color: '#2a2a2a', marginLeft: 5 }}
                onChangeText={(password) => { this.setState({ password }); }}
              />
            </Item>

            <Button rounded full onPress={this.logIn}>
              <Text>
                Iniciar Sesión
              </Text>
            </Button>
          </Col>
        </View>

        <Modal transparent={true} animationType="fade" visible={loggingIn} onRequestClose={() => {}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}
          >
            <View
              style={{
                flex: 0,
                backgroundColor: '#eeeeee',
                borderRadius: 5,
                marginHorizontal: 15,
                paddingHorizontal: 20,
                paddingVertical: 15,
                elevation: 4,
              }}
            >
              <Loader />
            </View>
          </View>
        </Modal>
      </Fragment>
    );
  }
}

export default LogIn;
