import React, { Component } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Header, Text, Button } from 'native-base';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { SQLite, DangerZone } from 'expo';

import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';
import NavBar from '../../components/NavBar';

import styles from './styles';
const { Lottie } = DangerZone;
const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

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

    return (
      <View style={Layouts.container}>
        <NavBar
          menu
          title="TTracking"
          options={["Agregar Manualmente", "Cerrar sesión",]}
        />

        <Col style={[styles.content, { paddingBottom: 15, justifyContent: 'space-between' }]}>
          <View style={{ flex: 0 }}>
            <TouchableOpacity activeOpacity={0.9} style={styles.option} onPress={this.goToTracking}>
              <MaterialCommunityIcons name="clock-fast" size={36} color={Colors.tintColor} style={{ width: 35, alignSelf: 'center' }} />

              <View style={{ flex: 1, flexShrink: 1, flexDirection: 'column', marginLeft: 15 }}>
                <Text style={Layouts.title}>
                  Tracking
                </Text>
                <Text style={Layouts.subtitle}>
                  Hazle seguimiento a una nueva actividad
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={styles.option} onPress={this.goToReports}>
              <Ionicons name="md-clipboard" size={36} color={Colors.tintColor} style={{ width: 35, paddingLeft: 5 }} />

              <View style={{ flex: 1, flexShrink: 1, flexDirection: 'column', marginLeft: 15 }}>
                <Text style={Layouts.title}>
                  Reportes
                </Text>
                <Text style={Layouts.subtitle}>
                  Aprende como mejorar tu rendimiento en tu reporte personalizado
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={styles.option} onPress={this.goToHistoric}>
              <MaterialCommunityIcons name="history" size={36} color={Colors.tintColor} style={{ width: 35 }} />

              <View style={{ flex: 1, flexShrink: 1, flexDirection: 'column', marginLeft: 15 }}>
                <Text style={[Layouts.title]}>
                  Historial
                </Text>
                <Text style={[Layouts.subtitle]}>
                  Mide tu rendimiento en actividades pasadas
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 0, height: 40, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Lottie
              ref={animation => { this.animation2 = animation; }}
              onLayout={() => { this.animation2.play(); }}
              speed={0.8}
              style={{ width: 85, height: 85, position: 'relative', left: -deviceWidth * 0.025, backgroundColor: '#fcfcfc'}}
              source={require('../../../assets/animations/heart.json')}
            />
            <Lottie
              ref={animation => { this.animation = animation; }}
              onLayout={() => { this.animation.play(); }}
              style={{ width: 100, height: 100, position: 'absolute', left: deviceWidth * 0.56, top: -deviceHeight * 0.055 }}
              source={require('../../../assets/animations/coffee.json')}
            />
            <Text style={{ color: '#634e35', position: 'absolute' }}>
              {'Hecho con          y mucho         '}
            </Text>
          </View>
        </Col>
      </View>
    );
  }
}

export default Home;
