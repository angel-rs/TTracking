import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';

import styles from './styles';

const OverlayButton = ({ icon, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    style={[
      styles.button,
      icon === 'play' ? styles.play : styles.stop
    ]}
  >
    <Icon name={icon} style={{ color: 'white' }} />
  </TouchableOpacity>
)

export default OverlayButton;
