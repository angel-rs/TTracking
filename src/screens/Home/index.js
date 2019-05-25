import React, { Component } from 'react';
import { View, Header, Text, Button } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { SQLite } from 'expo';

import Layouts from '../../constants/Layouts';
import NavBar from '../../components/NavBar';

import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.db = null;
    this.navigation = props.navigation;
  }

  componentWillMount() {
    this.db = SQLite.openDatabase('TTracking.db');
    this.db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists records (id text, title text, category text, trackedTime int, creationTime text, finishTime text);'
      );
    });
  }

  goToTracking = () => {
    this.navigation.push('Tracking');
  }

  goToReports = () => {
    this.navigation.push('Reports');
  }

  goToHistoric = () => {
    this.navigation.push('Historic');
  }

  render() {
    const name = 'Angel';
    const currentTime = (new Date()).getHours();
    let greeting = `Epa ${name}`;

    if (currentTime < 12) {
      greenting = `Buenos días, ${name}!`;
    } else if (currentTime < 18) {
      greeting = `Buenas tardes, ${name}!`;
    } else {
      greeting = `Buenas noches, ${name}!`;
    }

    return (
      <View style={Layouts.container}>
        <NavBar
          menu
          title="TTracking"
          options={["Cerrar sesión", "Volver"]}
        />

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

          <TouchableOpacity activeOpacity={0.9} style={styles.option} onPress={this.goToReports}>
            <Text style={Layouts.title}>
              Reportes
            </Text>
            <Text style={Layouts.subtitle}>
              Aprende como mejorar tu rendimiento en tu reporte personalizado
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.option} onPress={this.goToHistoric}>
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
