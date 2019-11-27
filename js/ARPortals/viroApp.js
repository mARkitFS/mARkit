"use strict";

import React, { Component } from "react";

import { ViroARSceneNavigator } from "react-viro";

const initalAR = require("./MainScene");

export default class ViroApp extends Component {
  render() {
    console.log(this.props, "props in viroapp js");
    const { navigation } = this.props;
    const portalId = navigation.state.params.portalId;
    console.log("portalId var in viroApp", portalId);
    return (
      <ViroARSceneNavigator
        initialScene={{
          scene: initalAR,
          passProps: { portalId: portalId },
        }}
      />
    );
  }
}

module.exports = ViroApp;
