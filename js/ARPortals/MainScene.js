'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import {StyleSheet} from 'react-native';

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
  ViroARTrackingTargets
} from 'react-viro';

import ThreeDObject from '../../ARScenes/Portals/ThreeDObject'
const elementId = 1
class MainScene extends Component {
  render() {
    return (
      <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={200}/>
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={() => {}}>
          <ViroPortal position={[0, 0, -1]} scale={[0.1, 0.1, 0.1]}>
            <Viro3DObject
              source={require('../ARPortals/portal_res/portal_ship/portal_ship.vrx')}
              resources={[require('../ARPortals/portal_res/portal_ship/portal_ship_diffuse.png'),
                          require('../ARPortals/portal_res/portal_ship/portal_ship_normal.png'),
                          require('../ARPortals/portal_res/portal_ship/portal_ship_specular.png')]}
              type="VRX" />
          </ViroPortal>
          <Viro360Video source={require('../res/Kaleidoscope.mp4')} loop={true} />
          <ThreeDObject elementId = {elementId} position={[2, 2, -3]} />
        <ThreeDObject position={[1, 1.5, -5]} />
        <ThreeDObject position={[-1, 1, -4]} />
        </ViroPortalScene>
      </ViroARScene>
    );
  }
}

module.exports = MainScene;
