'use strict';

import React, { Component } from 'react';

import { ViroARSceneNavigator } from 'react-viro';

import { View, TouchableHighlight, Image } from 'react-native';

const initalAR = require('./MainScene');

export default class ViroApp extends Component {
  render() {
    console.log(this.props.navigation.state.params, 'props in viroapp js');
    const params = this.props.navigation.state.params;
    return (
      <View style={{ flex: 3 }}>
        <ViroARSceneNavigator
          initialScene={{
            scene: initalAR,
            passProps: {
              background: params.background,
              elements: params.elements,
              viro360Type: params.viro360Type,
              loop: params.loop,
              portal: params.portal,
              screen: params.screen,
              userId: params.userId
            },
          }}
        />
        <View style={{ flex: 1, position: 'absolute' }}>
          <TouchableHighlight
            onPress={() => {
              // this.props.navigation.goBack(null)
              this.props.navigation.navigate(`${params.screen}`, { userId: params.userId });
            }}
          >
            <Image source={require('../res/icon_close_w.png')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = ViroApp;
