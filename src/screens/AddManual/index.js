import React, { Component } from 'react';
import { Button, Text, Input, Item, Label, Toast, Picker } from 'native-base';
import { View, Image, Modal, Dimensions, AsyncStorage } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Col, Row } from 'react-native-easy-grid';
import { SQLite } from 'expo';
import uuidv4 from 'uuid/v4';

import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';
import NavBar from '../../components/NavBar';

import styles from './styles';

const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');
const categories = ['Trabajo', 'Estudios', 'Transporte', 'Ocio', 'Otro'];
const pad = (numberString, size) => {
  let padded = numberString;
  while (padded.length < size) {
    padded = `0${padded}`;
  }
  return padded;
};

class AddManual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: '',
      category: 'Trabajo',
      creationTime: null,
      finishTime: null,
    };
    this.navigation = props.navigation;
    this.db = null;
  }

  componentWillMount() {
    this.db = SQLite.openDatabase('TTracking.db');
  }

  addRecord = () => {
    const {
      activity,
      category,
      creationTime: _creationTime,
      finishTime: _finishTime,
    } = this.state;

    const id = uuidv4();
    const title = activity;
    const creationTime = new Date(_creationTime);
    const finishTime = new Date(_finishTime);
    const trackedTime = Math.abs(finishTime.getTime() - creationTime.getTime());

    this.db.transaction((tx) => {
      tx.executeSql(
        `insert into records (id, title, category, trackedTime, creationTime, finishTime) values (?, ?, ?, ?, ?, ?)`,
        [id, title, category, trackedTime, creationTime.toJSON(), finishTime.toJSON()],
        (success, response) => {
          console.log(success);
          console.log(response);
        },
        (error, other) => {
          console.log(error);
          console.log(other);
        }
      );
    });

    Toast.show({
      text: 'Guardado con éxito!',
      buttonText: 'Ok',
      position: "top",
      type: 'success',
      duration: 5000,
    });
  }

  render() {
    const {
      activity,
      category,
      creationTime,
      finishTime,
      showCalendar1,
      showCalendar2,
    } = this.state;
    let formattedStartTime = '';
    let formattedFinishTime = '';
    let d1 = undefined;
    let d2 = undefined;
    let startMaxDate = new Date();

    const isButtonDisabled = !activity || !creationTime || !finishTime;

    if (creationTime) {
      d1 = new Date(creationTime);
      formattedStartTime = [
        pad(d1.getDate(), 2),
        pad(d1.getMonth() + 1, 2),
        d1.getFullYear()
      ].join('/') + ' ' + [
        pad(d1.getHours(), 2),
        pad(d1.getMinutes(), 2)
      ].join(':');
    }

    if (finishTime) {
      d2 = new Date(finishTime);
      startMaxDate = d2;
      formattedFinishTime = [
        pad(d2.getDate(), 2),
        pad(d2.getMonth() + 1, 2),
        d2.getFullYear()
      ].join('/') + ' ' + [
        pad(d2.getHours(), 2),
        pad(d2.getMinutes(), 2)
      ].join(':');
    }

    return (
      <View style={Layouts.container}>
        <NavBar goBack title="Agregar manualmente" />

        <Col style={styles.content}>
          <View style={{ flex: 0 }}>
            <Item floatingLabel>
              <Label style={{ color: 'gray' }}>
                Actividad
              </Label>
              <Input
                selectionColor={Colors.tintColor}
                style={{ color: '#2a2a2a', marginLeft: 5 }}
                onChangeText={(activity) => { this.setState({ activity }) }}
              />
            </Item>

            <Item style={{ marginTop: 30 }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 14,
                  position: 'absolute',
                  top: '-25%',
                }}
              >
                Categoria
              </Text>

              <Picker
                note
                mode="dialog"
                style={{ width: deviceWidth * 0.9, borderWidth: 1, borderColor: 'black', color: '#2a2a2a' }}
                selectedValue={category}
                onValueChange={this.onCategoryChange}
              >
                {
                  categories.map((_category) => (
                    <Picker.Item
                      key={_category}
                      label={_category}
                      value={_category}
                      style={{ color: 'gray' }}
                    />
                  ))
                }
              </Picker>
            </Item>

            <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <Item
                style={{ width: 200, justifyContent: 'space-between', marginTop: 10 }}
                onPress={() => { this.setState({ showCalendar1: true }); }}
              >
                <Label>
                  { creationTime ? formattedStartTime : 'Inicio' }
                </Label>
                <DateTimePicker
                  mode="datetime"
                  isVisible={showCalendar1}
                  maximumDate={startMaxDate}
                  onConfirm={(creationTime) => { this.setState({ creationTime, showCalendar1: false }); }}
                  onCancel={() => { this.setState({ showCalendar1: false, creationTime: null }); }}
                />

                <MaterialCommunityIcons name="calendar-range" size={28} style={{ color: '#2a2a2a' }} />
              </Item>
            </View>

            <Item
              style={{ width: 200, justifyContent: 'space-between', marginTop: 30 }}
              onPress={() => { this.setState({ showCalendar2: true }); }}
            >
              <Label>
                { finishTime ? formattedFinishTime : 'Fin' }
              </Label>
              <DateTimePicker
                mode="datetime"
                isVisible={showCalendar2}
                minimumDate={d1}
                maximumDate={(new Date())}
                onConfirm={(finishTime) => { this.setState({ finishTime, showCalendar2: false }); }}
                onCancel={() => { this.setState({ showCalendar2: false, finishTime: null }); }}
              />
              <MaterialCommunityIcons name="calendar-range" size={28} style={{ color: '#2a2a2a' }} />
            </Item>
          </View>

          <Button
            full
            disabled={isButtonDisabled}
            onPress={this.addRecord}
            style={isButtonDisabled ? { backgroundColor: 'lightgray' } : null}
          >
            <Text>
              Guardar
            </Text>
          </Button>
        </Col>
      </View>
    );
  }
}

export default AddManual;
