import React, { Component, Fragment } from 'react';
import { Button, Text, Input, Item, Label, Toast } from 'native-base';
import { View, Image, Modal, Dimensions, AsyncStorage } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import * as firebase from 'firebase';
import { DangerZone } from 'expo';

import NavBar from '../../components/NavBar';
import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';

import styles from './styles';
const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
const { Lottie } = DangerZone;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      _showModal: false,
    },
    this.navigation = props.navigation;
  }

  signUp = async () => {
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
        text: 'La contraseña debe ser de almenos 6 caracacteres',
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

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.setState({ _showModal: true });
    } catch (error) {
      console.log(error.toString(error));

      if (error.toString(error) === 'Error: The email address is already in use by another account.') {
        Toast.show({
          text: 'Ya existe otra cuenta con ese correo',
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
    }
  }

  render() {
    const { _showModal } = this.state;

    return (
      <Fragment>
        <View style={Layouts.container}>
          <NavBar goBack title="Registro" />

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

            <Button rounded full onPress={this.signUp}>
              <Text>
                Registrarme
              </Text>
            </Button>
          </Col>
        </View>

        <Modal
          transparent={true}
          animationType="fade"
          visible={_showModal}
          onRequestClose={() => { this.setState({ _showModal: false }); }}
        >
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
              <Lottie
                loop={false}
                ref={animation => { this.animation = animation; }}
                onLayout={() => { this.animation.play(); }}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
                source={require('../../../assets/animations/check.json')}
              />

              <Text style={{ textAlign: 'center', color: '#3c332b' }}>
                <Text style={{ fontWeight: '600' }}>
                  {'¡Todo listo!\n\n'}
                </Text>
                {'Esperamos que disfrutes\nusando '}
                <Text style={{ color: Colors.tintColor, fontWeight: '800' }}>
                  TTracking
                </Text>
              </Text>

              <Button
                style={[Layouts.center, { width: deviceWidth * 0.35, marginTop: 15, alignSelf: 'center' }]}
                onPress={() => {
                  this.setState({ _showModal: false });
                  AsyncStorage.setItem('loggedIn', 'TRUE');
                  this.navigation.navigate('Home');
                }}
              >
                <Text>
                  Ok!
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </Fragment>
    );
  }
}

export default SignUp;
