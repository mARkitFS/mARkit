'use strict';

import React, { Component } from 'react';

import { ViroARSceneNavigator } from 'react-viro';

import { View, TouchableHighlight, Image } from 'react-native';

import { images } from '../res/images';

const initalAR = require('./MainScene');

export default class ViroApp extends Component {
  render() {
    console.log(this.props, 'props in viroapp js');
    const { navigation } = this.props;
    const portalId = navigation.state.params.portalId;
    console.log('portalId var in viroApp', portalId);
    return (
      <View style={{ flex: 3 }}>
        <ViroARSceneNavigator
          initialScene={{
            scene: initalAR,
            passProps: { portalId: portalId },
          }}
        />
        <View style={{ flex: 1, position: 'absolute' }}>
          <TouchableHighlight>
            <Image source={require('../res/icon_close_w.png')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = ViroApp;
