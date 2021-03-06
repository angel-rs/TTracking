import React, { Component } from 'react';
import { View, Text } from 'native-base';

import styles from './styles';

class Clock extends Component {
  render() {
    const {
      hide,
      time,
      style,
    } = this.props;

    if (hide) return null;

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.time}>
          { time }
        </Text>
      </View>
    );
  }
}

export default Clock;
