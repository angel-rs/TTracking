import React, { Component } from 'react';
import { View, Header, Text, Button } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { SQLite } from 'expo';

import Layouts from '../../constants/Layouts';
import NavBar from '../../components/NavBar';

import styles from './styles';

class AddManual extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.db = null;
  }

  componentWillMount() {
    this.db = SQLite.openDatabase('TTracking.db');
    this.db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists records (id text, title text, category text, trackedTime int, creationTime text);'
      );
    });
  }

  render() {
    return (
      <View style={Layouts.container}>
        <NavBar
          goBack
          title="Agregar manualmente"
          options={["Cerrar sesión", "Volver"]}
        />

        <Col style={styles.content}>
          <Text>
            Por desarrollar
          </Text>
        </Col>
      </View>
    );
  }
}

export default AddManual;
