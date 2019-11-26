'use strict';

import React, { Component } from 'react';

import { ViroARSceneNavigator } from 'react-viro';

const initalAR = require('./MainScene');

export default class ViroApp extends Component {
  render() {
    return <ViroARSceneNavigator initialScene={{ scene: initalAR }} />;
  }
}

module.exports = ViroApp;
