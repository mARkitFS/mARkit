"use strict";

import React, { Component } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { images } from "../../js/res/images";

import {
  ViroSceneNavigator,
  ViroScene,
  ViroARScene,
  ViroAmbientLight,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroARImageMarker,
  ViroBox,
  ViroARTrackingTargets,
} from "react-viro";

import ThreeDObject from "../../ARScenes/Portals/ThreeDObject";

class MainScene extends Component {

  render() {
    let TagViro360 = this.props.viro360Type || Viro360Video;
    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <ViroPortal position={[0, 0, -1]} scale={[0.1, 0.1, 0.1]}>
            <Viro3DObject
              source={require("../ARPortals/portal_res/portal_ship/portal_ship.vrx")}
              resources={[
                require("../ARPortals/portal_res/portal_ship/portal_ship_diffuse.png"),
                require("../ARPortals/portal_res/portal_ship/portal_ship_normal.png"),
                require("../ARPortals/portal_res/portal_ship/portal_ship_specular.png"),
              ]}
              type="VRX"
            />
          </ViroPortal>
          <TagViro360
            source={{ uri: images.background[this.props.background].uri }}
            loop={this.props.loop}
          />
          {this.props.elements.map((element, index) => (
            <ThreeDObject key={index} element={element} />
          ))}
        </ViroPortalScene>
      </ViroARScene>
    );
  }
}

module.exports = MainScene;
