import React, { Component } from 'react';
import { View, Header, Text, Button } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { SQLite } from 'expo';

import Layouts from '../../constants/Layouts';
import NavBar from '../../components/NavBar';

import styles from './styles';

class Historic extends Component {
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
    this.db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists records (id text, title text, category text, trackedTime int, creationTime text);'
      );
    });
    this.db.transaction((tx) => {
      tx.executeSql(
        'select * from records;',
        null,
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
          title="Historial"
          options={["Cerrar sesión", "Volver"]}
        />

        <Col style={styles.content}>
          {
            records.length === 0
              ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 18, color: 'dimgray', marginBottom: 10 }}>
                    Aún no tienes ningún registro!
                  </Text>

                  <Button transparent style={{ alignSelf: 'center' }} onPress={() => this.navigation.goBack()}>
                    <Text>
                      Volver
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

export default Historic;
