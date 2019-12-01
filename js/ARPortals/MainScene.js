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
  constructor(props) {
    super(props);
    this.state = {
      background: "party",
      elements: [],
      viro360Type: Viro360Video,
      loop: true,
    };
  }

  async componentDidMount() {
    console.log(this.props, "props in component did mount");
    let portalId = this.props.portalId;
    try {
      const element = await axios.get(
        `http://172.20.1.222:8080/api/elementprops/portal/${portalId}`
      );
      const portal = await axios.get(
        `http://172.20.1.222:8080/api/portals/${portalId}`
      );
      const background = await axios.get(
        `http://172.20.1.222:8080/api/backgrounds/${portal.data.backgroundId}`
      );
      let Viro360Type =
        background.data.type === "Viro360Video" ? Viro360Video : Viro360Image;
      this.setState({
        background: background.data.name,
        elements: element.data,
        viro360Type: Viro360Type,
        loop: background.data.loop,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    console.log("state>>>>>>", this.props);

    let TagViro360 = this.state.viro360Type || Viro360Video;
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
            source={{ uri: images.background[this.state.background].uri }}
            loop={this.state.loop}
          />
          {this.state.elements.map((element, index) => (
            <ThreeDObject key={index} element={element} />
          ))}
        </ViroPortalScene>
      </ViroARScene>
    );
  }
}

module.exports = MainScene;
