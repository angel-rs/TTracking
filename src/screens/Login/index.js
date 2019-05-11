import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'galio-framework';

import NavBar from '../../components/NavBar';
import Layouts from '../../constants/Layouts';

import styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Layouts.container}>
        <NavBar title="Iniciar sesión" rightIcon="apps" />

        <View style={Layouts.content}>
          <Button>
            Continuar con Facebook
          </Button>

          <Button>
            Continuar con Twitter
          </Button>

          <Button>
            Continuar con Google
          </Button>
        </View>
      </View>
    );
  }
}

export default Login;
