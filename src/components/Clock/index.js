import React, { Component } from 'react';
import { View, Text } from 'native-base';

import styles from './styles';

class Clock extends Component {
  render() {
    const { time } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.time}>
          { time }
        </Text>
      </View>
    );
  }
}

export default Clock;
