import React, { Component, Fragment } from 'react';
import { Col, Row } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import { SQLite, DangerZone } from 'expo';
import {
  AppState,
  BackHandler,
  Dimensions,
  Keyboard,
  ScrollView,
  Modal,
} from 'react-native';
import {
  View,
  Text,
  Button,
  Input,
  Label,
  Item,
  Picker,
  Toast,
} from 'native-base';

const { Lottie } = DangerZone;
import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';
import newTimer, { millisecondsToHuman } from '../../utils/Timer';

import NavBar from '../../components/NavBar';
import Clock from '../../components/Clock';
import OverlayButton from '../../components/OverlayButton';

import styles from './styles';

const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');
const categories = ['Trabajo', 'Estudios', 'Transporte', 'Ocio', 'Otro'];
const TIME_INTERVAL = 1000;

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

      _appState: AppState.currentState,
      _keyboardIsOpen: false,
      _isInputFocused: false,
      _isModalVisible: false,
      _isFirstActivity: false,
      _showCongratsModal: false,
    };
    this.db = null;
    this.navigation = props.navigation;
  }

  componentWillMount () {
    this.db = SQLite.openDatabase('TTracking.db');
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentDidMount() {
    this.db.transaction((tx) => {
      tx.executeSql(
        'select * from records;',
        [],
        (_, { rows: records }) => {
          this.setState({ _isFirstActivity: records._array.length === 0 });
        }
      );
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _updateTrackedTime = () => {
    const { timer: _timer } = this.state;

    if (_timer) {
      const creationTime = new Date(_timer.creationTime);
      const now = new Date();
      const elapsedTime = Math.abs(creationTime.getTime() - now.getTime());

      console.log(`resumed your shit from ${_timer.trackedTime} to ${_timer.trackedTime + elapsedTime}`);
      this.setState({
        timer: {
          ..._timer,
          trackedTime: elapsedTime,
        }
      });

      this.interval = setInterval(() => {
        const { timer, tracking } = this.state;
        this.setState({
          timer: {
            ...timer,
            trackedTime: tracking ? timer.trackedTime + TIME_INTERVAL : timer.trackedTime,
          }
        })
      }, TIME_INTERVAL);
    }
  }

  _handleBackPress = () => {
    const { tracking } = this.state;

    if (tracking) {
      this.setState({ _isModalVisible: true });
      return true;
    }

    return false;
  }

  _handleAppStateChange = (nextAppState) => {
    const { _appState } = this.state;

    if (_appState.match(/inactive|background/) && nextAppState === 'active') {
      this._updateTrackedTime();
    }

    if (_appState === 'active' && nextAppState.match(/inactive|background/)) {
      clearInterval(this.interval);
    }

    this.setState({ _appState: nextAppState });
  }

  _keyboardDidShow = () => {
    this.setState({ _keyboardIsOpen: true });
  }

  _keyboardDidHide = () => {
    this.setState({ _keyboardIsOpen: false });
  }

  addRecord = ({ id, title, category, trackedTime, creationTime }) => {
    const { _isFirstActivity } = this.state;

    this.db.transaction((tx) => {
      tx.executeSql(
        `insert into records (id, title, category, trackedTime, creationTime, finishTime) values (?, ?, ?, ?, ?, ?)`,
        [id, title || 'Actividad sin nombre', category, trackedTime, creationTime, (new Date()).toJSON()],
        (success, response) => {},
        (error, other) => {}
      );
    });

    if (_isFirstActivity) {
      this.setState({ _showCongratsModal: true, _isFirstActivity: false });
    }

    Toast.show({
      text: 'Guardado con éxito!',
      buttonText: 'Ok',
      position: "top",
      type: 'success',
      duration: 5000,
    });
  }

  startTracking = () => {
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

  stopTracking = (saveRecord = true) => {
    const { timer } = this.state;
    this.setState({ tracking: false });
    clearInterval(this.interval);

    if (saveRecord) {
      this.addRecord(timer);
      this.setState({ timer: null });
    }
  }

  onCategoryChange= (category) => {
    this.setState({ category });
  }

  render() {
    const {
      tracking,
      title,
      timer,
      category,
      categories,
      _keyboardIsOpen,
      _isInputFocused,
      _isModalVisible,
      _showCongratsModal
    } = this.state;

    return (
      <Fragment>
        <ScrollView style={Layouts.container} scrollEnabled={false}>
          <NavBar
            goBack
            goBackBefore={() => {
              if (tracking) {
                this.setState({ _isModalVisible: true });
                return false;
              }

              return true;
            }}
            menu
            title="Tracking"
            options={[
              "Agregar Manualmente",
              "Cancelar"
            ]}
          />

          <Clock
            hide={_keyboardIsOpen}
            time={timer ? millisecondsToHuman(timer.trackedTime) : '00:00:00' }
          />

          <View
            style={[
              styles.content,
              _keyboardIsOpen && { paddingTop: 25 }
            ]}
          >
            <OverlayButton
              hide={_keyboardIsOpen}
              disabled={title.length === 0}
              icon={tracking ? 'square' : 'play'}
              onPress={tracking ? this.stopTracking : this.startTracking}
              style={{ top: '-15%' }}
            />

            <Col style={{ paddingBottom: 40 }}>
              <Item floatingLabel>
                <Label
                  style={{
                    color: 'gray',
                    paddingLeft: _isInputFocused || title ? 0 : 10,
                    marginBottom: _isInputFocused ? 0 : 20,
                  }}
                >
                  Actividad
                </Label>
                <Input
                  disabled={tracking}
                  style={{ color: '#2a2a2a', marginLeft: 5 }}
                  selectionColor={Colors.tintColor}
                  onFocus={() => { this.setState({ _isInputFocused: true }); }}
                  onBlur={() => { this.setState({ _isInputFocused: false }); }}
                  onChangeText={(title) => { this.setState({ title }) }}
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
        </ScrollView>

        <Modal
          transparent={true}
          animationType="fade"
          visible={_isModalVisible}
          onRequestClose={() => {
            this.setState({ _isModalVisible: false });
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}
          >
            <View
              style={{
                flex: 0,
                backgroundColor: '#eeeeee',
                borderRadius: 5,
                marginHorizontal: 15,
                paddingHorizontal: 20,
                paddingVertical: 15,
                elevation: 4,
              }}
            >
              <Text style={{ textAlign: 'center', color: '#3c332b' }}>
                {`¿Estás seguro que deseas salir?\n`}
                <Text style={{ color: Colors.red }}>
                  {`Perderás el progreso de tu actividad actual!\n\n`}
                </Text>
              </Text>

              <Text style={{ textAlign: 'center', fontSize: 14, color: '#828282' }}>
                {`Recuerda que siempre puedes dejar la aplicación en segundo plano y seguir midiendo tus actividades`}
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                <Button
                  danger
                  style={[Layouts.center, { width: deviceWidth * 0.35 }]}
                  onPress={() => {
                    this.setState({ _isModalVisible: false });
                    this.stopTracking(false);
                    this.navigation.goBack();
                  }}
                >
                  <Text>
                    Salir
                  </Text>
                </Button>

                <Button
                  style={[Layouts.center, { width: deviceWidth * 0.35 }]}
                  onPress={() => { this.setState({ _isModalVisible: false }); } }
                >
                  <Text>
                    Ok, Volver
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          animationType="fade"
          visible={_showCongratsModal}
          onRequestClose={() => {
            this.setState({ _showCongratsModal: false });
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}
          >
            <View
              style={{
                flex: 0,
                backgroundColor: '#eeeeee',
                borderRadius: 5,
                marginHorizontal: 15,
                paddingHorizontal: 20,
                paddingVertical: 15,
                elevation: 4,
              }}
            >
              <Lottie
                loop={false}
                ref={animation => {
                  this.animation = animation;
                }}
                onLayout={() => {
                  this.animation.play();
                }}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
                source={require('../../../assets/animations/check.json')}
              />

              <Text style={{ textAlign: 'center', color: '#3c332b' }}>
                <Text style={{ fontWeight: '600' }}>
                  ¡Eso es!
                </Text>
                {`\n¡Felicidades en tu nueva actividad medida!\n\nEsperamos que tengas una cálida\nexperiencia usando `}
                <Text style={{ color: Colors.tintColor, fontWeight: '800' }}>
                  TTracking
                </Text>
              </Text>

              <Button
                style={[Layouts.center, { width: deviceWidth * 0.35, marginTop: 15, alignSelf: 'center' }]}
                onPress={() => { this.setState({ _showCongratsModal: false }); } }
              >
                <Text>
                  Ok!
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </Fragment>
    );
  }
}

export default withNavigation(Tracking);
