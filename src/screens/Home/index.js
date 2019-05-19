import React, { Component } from 'react';
import { View, Header, Text, Button } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';

import Layouts from '../../constants/Layouts';
import NavBar from '../../components/NavBar';

import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  goToTracking = () => {
    this.navigation.navigate('Tracking');
  }

  goToReports = () => {
    this.navigation.navigate('Reports');
  }

  goToHistoric = () => {
    this.navigation.navigate('Historic');
  }

  render() {
    const name = 'Angel';
    const currentTime = (new Date()).getHours();
    let greeting;

    if (currentTime < 12) greenting = `Buenos días, ${name}!`;
    else if (currentTime < 18) greeting = `Buenas tardes, ${name}!`;
    else greeting = `Buenas noches, ${name}!`;

    return (
      <View style={Layouts.container}>
        <NavBar menu title="TTracking" />

        <Col style={styles.content}>
          <Text style={{ fontSize: 20 }}>
            { greeting }
          </Text>

          <TouchableOpacity activeOpacity={0.9} style={styles.option} onPress={this.goToTracking}>
            <Text style={Layouts.title}>
              Tracking
            </Text>
            <Text style={Layouts.subtitle}>
              Hazle seguimiento a una nueva actividad
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.option}>
            <Text style={Layouts.title}>
              Reportes
            </Text>
            <Text style={Layouts.subtitle}>
              Aprende como mejorar tu rendimiento en tu reporte personalizado
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.option}>
            <Text style={Layouts.title}>
              Historial
            </Text>
            <Text style={Layouts.subtitle}>
              Mide tu rendimiento en actividades pasadas
            </Text>
          </TouchableOpacity>
        </Col>
      </View>
    );
  }
}

export default Home;
