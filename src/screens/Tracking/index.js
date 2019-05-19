import React, { Component } from 'react';
import { View, Header, Text, Button } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';

import Layouts from '../../constants/Layouts';
import Timer, { millisecondsToHuman } from '../../utils/Timer';

import NavBar from '../../components/NavBar';
import Clock from '../../components/Clock';
import OverlayButton from '../../components/OverlayButton';

import styles from './styles';

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracking: false,
      timer: null,
      elapsed: null,
    };
  }

  componentWillUnmount() {
    this.stopTracking();
  }

  startTracking = () => {
    const TIME_INTERVAL = 1000;
    const { trackedTime, title, category, timer: _timer } = this.state;

    this.setState({ tracking: true });

    if (!_timer) this.setState({ timer: new Timer({ title, category }) });

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
    this.setState({ tracking: false });
    clearInterval(this.interval);
  }

  render() {
    const { tracking, timer } = this.state;

    return (
      <View style={Layouts.container}>
        <NavBar goBack menu title="Tracking" />

        <Clock time={timer ? millisecondsToHuman(timer.trackedTime) : '00:00:00' }/>

        <Col style={styles.content}>
          <OverlayButton
            icon={tracking ? 'square' : 'play'}
            onPress={tracking ? this.stopTracking : this.startTracking}
          />
        </Col>
      </View>
    );
  }
}

export default Tracking;
