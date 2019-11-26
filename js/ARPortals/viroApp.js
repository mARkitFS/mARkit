'use strict';

import React, { Component } from 'react';

import { ViroARSceneNavigator } from 'react-viro';

const initalAR = require('./MainScene');

export default class ViroApp extends Component {
  render() {
    console.log(this.props, 'props in viroapp js');
    const { navigation } = this.props;
    const templateId = navigation.state.params.templateId;
    console.log('templateId var in viroApp', templateId);
    return (
      <ViroARSceneNavigator
        initialScene={{
          scene: initalAR,
          passProps: { templateId: templateId },
        }}
      />
    );
  }
}

module.exports = ViroApp;
