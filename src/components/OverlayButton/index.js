import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';

import styles from './styles';

const OverlayButton = ({ hide, icon, onPress, style, disabled }) => {
  if (hide) return null;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.94}
      onPress={onPress}
      style={[
        styles.button,
        icon === 'play' ? styles.play : styles.stop,
        disabled ? { backgroundColor: '#cccccc' } : null,
        style,
      ]}
    >
      <Icon name={icon} style={{ color: 'white' }} />
    </TouchableOpacity>
  );
}

export default OverlayButton;
