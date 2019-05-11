import React, { PureComponent } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Text, Icon } from 'galio-framework';
import { View } from 'react-native';

import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';

import styles from './styles';

class NavBar extends PureComponent {
  render() {
    const {
      title,
      rightIcon,
    } = this.props;

    return (
      <View style={styles.nav}>
        <Row>
          <Col size={75} style={Layouts.verticallyAlign}>
            <Text h5 style={styles.title}>
              { title }
            </Text>
          </Col>

          <Col size={25} style={Layouts.center}>
          </Col>
        </Row>
      </View>
    )
  }
}

export default NavBar;
