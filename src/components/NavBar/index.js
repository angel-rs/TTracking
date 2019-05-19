import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  Header,
  Left,
  Right,
  Button,
  Body,
  Text,
  Title,
  Icon,
} from 'native-base';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  render() {
    const {
      goBack,
      menu,
      title
    } = this.props;

    return (
      <Header noShadow>
        <Left>
          {
            goBack && (
              <Button transparent onClick={this.navigation.goBack}>
                <Icon name='arrow-back' />
              </Button>
            )
          }
        </Left>

        <Body>
          <Title>
            { title }
          </Title>
        </Body>

        <Right>
          {
            menu && (
              <Button transparent>
                <Icon name='apps' />
              </Button>
            )
          }
        </Right>
      </Header>
    );
  }
}

export default withNavigation(NavBar);
