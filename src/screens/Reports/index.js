import React, { Component } from 'react';
import { View, Header, Text, Button } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { SQLite } from 'expo';

import Layouts from '../../constants/Layouts';
import NavBar from '../../components/NavBar';

import styles from './styles';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
    this.navigation = props.navigation;
    this.db = null;
  }

  componentWillMount() {
    this.db = SQLite.openDatabase('TTracking.db');
  }

  componentDidMount() {
    this.db.transaction((tx) => {
      tx.executeSql(
        'select * from records;',
        [],
        (_, { rows: records }) => {
          this.setState({ records: records._array });
        }
      );
    });
  }

  render() {
    const { records } = this.state;

    return (
      <View style={Layouts.container}>
        <NavBar
          goBack
          menu
          title="Reportes"
          options={["Cerrar sesión", "Volver"]}
        />

        <Col style={styles.content}>
          {
            records.length === 0
              ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 18, color: 'dimgray', marginBottom: 10 }}>
                    Aún no tienes reportes, mide tus actividades y vuelve más tarde
                  </Text>

                  <Button transparent style={{ alignSelf: 'center' }} onPress={() => this.navigation.goBack()}>
                    <Text>
                      Ok
                    </Text>
                  </Button>
                </View>
              )
              : (
                <Text>
                  Por desarrollar
                </Text>
              )
          }

        </Col>
      </View>
    );
  }
}

export default Reports;
