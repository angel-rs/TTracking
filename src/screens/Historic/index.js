import React, { Component } from 'react';
import { Image, TouchableOpacity, SectionList } from 'react-native';
import { View, Header, Text, Button, ActionSheet } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import { SQLite, DangerZone } from 'expo';

import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';
import NavBar from '../../components/NavBar';
import Loader from '../../components/Loader';
import { millisecondsToHuman } from '../../utils/Timer';

import styles from './styles';

const { Lottie } = DangerZone;
const dayNames = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];
const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

class Historic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      ready: false,
    };
    this.navigation = props.navigation;
    this.db = null;
  }

  componentWillMount() {
    this.db = SQLite.openDatabase('TTracking.db');
    this.updateData();
  }

  updateData = () => {
    this.db.transaction((tx) => {
      tx.executeSql(
        'select * from records;',
        null,
        (_, { rows }) => {
          const records = [];
          const _records = [...rows._array.sort(({ creationTime: date1 }, { creationTime: date2 }) => { // ordered from most recent to older
            if (date1 > date2) return -1;
            if (date1 < date2) return 1;
            return 0;
          })];

          _records.forEach((_record) => {
            const now = new Date();
            const _creationTime = new Date(_record.creationTime);
            const _finishTime = new Date(_record.finishTime);
            const day = dayNames[_creationTime.getDay()];
            const date = _creationTime.getDate();
            const month = monthNames[_creationTime.getMonth()];
            const isToday = (
              _creationTime.getDate() === now.getDate()
              && _creationTime.getMonth() === now.getMonth()
              && _creationTime.getFullYear() === now.getFullYear()
            );
            const wasYesterday = (
              _creationTime.getDate() === now.getDate() - 1
              && _creationTime.getMonth() === now.getMonth()
              && _creationTime.getFullYear() === now.getFullYear()
            );
            let humanTitle = `${day}, ${date} ${month}`;

            if (isToday) {
              humanTitle = 'Hoy';
            }

            if (wasYesterday) {
              humanTitle = 'Ayer';
            }

            const found = records.findIndex((record) => {
              return record.title === humanTitle;
            });

            if (found !== -1) {
              // append to that existing section data
              records[found].data.push(_record);
            } else {
              // create the section
              records.push({
                title: humanTitle,
                data: [_record],
              });
            }
          });

          this.setState({ records, ready: true });
        }
      );
    });
  }

  remove = (id) => {
    console.log(`removing ${id}`);

    this.db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM records WHERE id='${id}';`,
        null,
        (success, other) => {
          console.log(success);
          console.log(other);
        },
        (error, other) => {
          console.log(error);
          console.log(other);
        }
      );
    });
  }

  renderContent = () => {
    const { records, ready } = this.state;

    if (!ready) {
      return (
        <View style={Layouts.center}>
          <Loader />
        </View>
      );
    }

    if (records.length === 0) {
      return (
        <View style={[Layouts.center, { flex: 1 }]}>
          <Lottie
            ref={animation => { this.animation = animation; }}
            onLayout={() => { this.animation.play(); }}
            style={{ width: 135, height: 135, alignSelf: 'center' }}
            source={require('../../../assets/animations/empty.json')}
          />

          <Text style={{ textAlign: 'center', fontSize: 16, color: 'dimgray', marginBottom: 10 }}>
            Aún no hay nada por aquí...
          </Text>

          <Button transparent style={{ alignSelf: 'center' }} onPress={() => this.navigation.goBack()}>
            <Text>
              Volver
            </Text>
          </Button>
        </View>
      );
    }

    return (
      <SectionList
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index, section }) => {
          const duration = millisecondsToHuman(item.trackedTime, false);
          const title = `${item.title[0].toUpperCase()}${item.title.substring(1, item.title.length)}`;
          let color;

          if (item.category === 'Trabajo') color = Colors.categories[0];
          if (item.category === 'Estudios') color = Colors.categories[1];
          if (item.category === 'Transporte') color = Colors.categories[2];
          if (item.category === 'Ocio') color = Colors.categories[3];
          if (item.category === 'Otro') color = Colors.categories[4];

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onLongPress={() => {
                const options = ['Eliminar', 'Volver'];
                const actionSheet = {
                  options,
                  title: "Opciones",
                };
                const actionSheetHandler = (_index) => {
                  const option = options[_index];

                  if (option) {
                    if (option === 'Eliminar') {
                      this.setState({ ready: false });
                      this.remove(item.id);
                      this.updateData();
                    }
                  }
                }

                ActionSheet.show(actionSheet, actionSheetHandler);
              }}
              key={index}
              style={{
                flex: 1,
                flexDirection: 'row',
                height: 40,
                paddingVertical: 3,
                paddingHorizontal: 5,
                marginHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
              <View style={{ flex: 0, flexDirection: 'row' }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: color,
                    borderRadius: 7.5,
                    marginRight: 10,
                    marginTop: 10,
                  }}
                />

                <Text>
                  {`${title}\n`}
                  <Text style={{ color: 'gray', fontSize: 14 }}>
                    { item.category }
                  </Text>
                </Text>
              </View>

              <View style={{ flex: 0 }}>
                <Text style={{ color: 'gray', fontSize: 14 }}>
                  { duration }
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12, marginLeft: 30, marginTop: 5 }}>
            { title }
          </Text>
        )}
        sections={records}
      />
    );
  }

  render() {
    console.log('render');
    return (
      <View style={Layouts.container}>
        <NavBar goBack title="Historial" />

        <Col style={styles.content}>
          { this.renderContent() }
        </Col>
      </View>
    );
  }
}

export default Historic;
