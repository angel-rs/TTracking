import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';

import styles from './styles';

const OverlayButton = ({ hide, icon, onPress, style }) => {
  if (hide) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.94}
      onPress={onPress}
      style={[
        styles.button,
        icon === 'play' ? styles.play : styles.stop,
        style,
      ]}
    >
      <Icon name={icon} style={{ color: 'white' }} />
    </TouchableOpacity>
  );
}

export default OverlayButton;
