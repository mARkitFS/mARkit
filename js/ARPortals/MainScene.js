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
      elements: [
        {name:'fox', type:"OBJ", position:[2, 2, -3], scale:[ .01, .01, .01] },
        {name:'fox', type:"OBJ", position:[1, 1.5, -5], scale:[ .01, .01, .01] },
        {name:'fox', type:"OBJ", position:[-1, 1, -4], scale:[ .01, .01, .01] }
      ],
      viro360Type: Viro360Video,
      loop: true
    }
  }

  async componentDidMount (){
    let portalId = 2
    try {
      const element = await axios.get(`http://10.1.85.88:8080/api/elementprops/portal/${portalId}`)
      const portal = await axios.get(`http://10.1.85.88:8080/api/portals/${portalId}`)
      // const background = await axios.get(`http://10.1.85.88:8080/api/backgrounds/${portal.backgroundId}`)
      this.setState({elements:element})
      // this.setState({
      //   background:background.name,
      //   viro360Type:background.type,
      //   loop:background.loop
      // })
    } catch (err) {
      console.error(err)
    }
  }
  //   if(templateId === 1){
  //     this.setState({
  //       background: 'party',
  //       elements: [
  //         {name:'fox', type:"OBJ", position:[2, 2, -3], scale:[ .01, .01, .01] },
  //         {name:'fox', type:"OBJ", position:[1, 1.5, -5], scale:[ .01, .01, .01] },
  //         {name:'fox', type:"OBJ", position:[-1, 1, -4], scale:[ .01, .01, .01] }
  //       ],
  //       viro360Type: Viro360Video,
  //       loop: true
  //     })
  //   } else{
  //     this.setState({
  //       background: 'beach',
  //       elements: [
  //         {name:'fox', type:"OBJ", position:[2, 2, -3], scale:[ .01, .01, .01] },
  //         {name:'fox', type:"OBJ", position:[1, 1.5, -5], scale:[ .01, .01, .01] },
  //         {name:'fox', type:"OBJ", position:[-1, 1, -4], scale:[ .01, .01, .01] }
  //       ],
  //       viro360Type: Viro360Image,
  //       loop: false
  //     })
  //   }

  // }


  render() {
    console.log('state>>>>>>',this.state)
    let TagViro360 = this.state.viro360Type || Viro360Video
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
            <TagViro360 source={{uri: images.background[this.state.background].uri}} loop = {this.state.loop} />
            {this.state.elements.map((element, index) =>
            <ThreeDObject key={index} element = {element} />)
            }
          </ViroPortalScene>
        </ViroARScene>);
    }
  }


module.exports = MainScene;
