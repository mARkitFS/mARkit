'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import {StyleSheet} from 'react-native';
import { images } from '../../js/res/images'

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

class MainScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: 'party',
      elements: {name:'coolGuy', type:"OBJ"},
      viro360Type: 'video'
    }
  }


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
            {/* <Viro360Image source={{uri: images.background[this.state.background].uri}} /> */}
            <Viro360Video source={{uri: images.background[this.state.background].uri}} loop={true} />
            <ThreeDObject element = {this.state.elements} position={[2, 2, -3]} />
            <ThreeDObject position={[1, 1.5, -5]} />
            <ThreeDObject position={[-1, 1, -4]} />
          </ViroPortalScene>
        </ViroARScene>);
    }
  }


module.exports = MainScene;