import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Landing extends Component {
  render() {
    return (
      <View
        style={
          ((flex = 1), (alignItems = 'center'), (justifyContent = 'center'))
        }
      >
        <Text>This is landing page</Text>
      </View>
    );
  }
}
