import React, { Component } from 'react';
import { Image, TouchableOpacity, KeyboardAvoidingView, Dimensions, Keyboard } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { SQLite } from 'expo';
import {
  View,
  Text,
  Button,
  Input,
  Label,
  Item,
  Form,
  Content,
  Picker,
} from 'native-base';

import Layouts from '../../constants/Layouts';
import newTimer, { millisecondsToHuman } from '../../utils/Timer';

import NavBar from '../../components/NavBar';
import Clock from '../../components/Clock';
import OverlayButton from '../../components/OverlayButton';

import styles from './styles';

const deviceWidth = Dimensions.get('window').width;

const categories = ['Estudios' , 'Trabajo', 'Ocio'];

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracking: false,
      timer: null,
      elapsed: null,
      title: '',
      category: categories[0],
      categories,
      _keyboardIsOpen: false,
      _isInputFocused: false,
    };
    this.db = null;
  }

  componentWillMount () {
    this.db = SQLite.openDatabase('TTracking.db');
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentDidMount() {
    this.db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists records (id text, title text, category text, trackedTime int, creationTime text);'
      );
    });
  }

  addRecord = ({ id, title, category, trackedTime, creationTime }) => {
    this.db.transaction((tx) => {
      tx.executeSql(
        `insert into records (id, title, category, trackedTime, creationTime) values (?, ?, ?, ?, ?)`,
        [id, title || 'Actividad sin nombre', category, trackedTime, creationTime],
        (success, response) => {},
        (error, other) => {
          if (error) {
            alert(`Ocurrió un error ${JSON.stringify(error)}`);
          }
        }
      );
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ _keyboardIsOpen: true });
  }

  _keyboardDidHide = () => {
    this.setState({ _keyboardIsOpen: false });
  }

  startTracking = () => {
    const TIME_INTERVAL = 1000;
    const { trackedTime, title, category, timer: _timer } = this.state;

    this.setState({ tracking: true });

    if (!_timer) this.setState({ timer: newTimer({ title, category }) });

    this.interval = setInterval(() => {
      const { timer, tracking } = this.state;

      this.setState({
        timer: {
          ...timer,
          trackedTime: tracking ? timer.trackedTime + TIME_INTERVAL : timer.trackedTime,
        }
      })
    }, TIME_INTERVAL);
  };

  stopTracking = () => {
    const { timer } = this.state;
    this.setState({ tracking: false });
    clearInterval(this.interval);
    this.addRecord(timer);
  }

  onCategoryChange= (category) => {
    this.setState({ category });
  }

  render() {
    const {
      tracking,
      timer,
      category,
      categories,
      _keyboardIsOpen,
      _isInputFocused,
    } = this.state;

    return (
      <View style={Layouts.container}>
        <NavBar goBack menu title="Tracking" />

        <Clock
          hide={_keyboardIsOpen}
          time={timer ? millisecondsToHuman(timer.trackedTime) : '00:00:00' }
          style={{
            marginTop: _keyboardIsOpen ? 0 : 60,
            marginBottom: _keyboardIsOpen ? 0 : 70,
          }}
        />

        <View
          style={[
            styles.content,
            _keyboardIsOpen && { paddingTop: 25 }
          ]}
          behavior="padding"
        >
          <OverlayButton
            hide={_keyboardIsOpen}
            icon={tracking ? 'square' : 'play'}
            onPress={tracking ? this.stopTracking : this.startTracking}
          />

          <Text style={{ marginBottom: 20, color: '#2a2a2a' }}>
            Nueva actividad
          </Text>

          <Col>
            <Item floatingLabel>
              <Label
                style={{
                  color: 'gray',
                  paddingLeft: _isInputFocused ? 0 : 10,
                  marginBottom: _isInputFocused ? 0 : 20,
                }}
              >
                Actividad
              </Label>
              <Input
                disabled={tracking}
                style={{ color: '#2a2a2a', marginLeft: 5 }}
                onFocus={() => {
                  this.setState({ _isInputFocused: true });
                }}
                onBlur={() => {
                  this.setState({ _isInputFocused: false });
                }}
                onChangeText={(title) => {
                  this.setState({ title })
                }}
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
          </Col>
        </View>
      </View>
    );
  }
}

export default Tracking;
