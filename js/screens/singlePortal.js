import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { images } from "../res/images";

import axios from "axios";
// this is the view you get when clicking a portal from the viewer dashboard

// get portal ID from viewerDashboard, AJAX the portal + all of its elements

// display a thumbnail (clickable, on click navigates to MainScene)
// components: name of portal, list of elements,thumbnail

// const portalId = 1;

import { Viro360Video, Viro360Image } from "react-viro";

export default class SinglePortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: "party",
      elements: [],
      viro360Type: Viro360Video,
      loop: true,
      portal: {},
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { portal } = navigation.state.params;
    const portalId = portal.id;
    try {
      const element = await axios.get(
        `http://10.1.85.96:8080/api/elementprops/portal/${portalId}`
      );
      // const portal = await axios.get(
      //   `http://10.1.85.96:8080/api/portals/${portalId}`
      // );
      const background = await axios.get(
        `http://10.1.85.96:8080/api/backgrounds/${portal.backgroundId}`
      );
      let Viro360Type =
        background.data.type === "Viro360Video" ? Viro360Video : Viro360Image;
      console.log("background: ", background.data.name);
      console.log("element: ", element.data);
      console.log("viro360Type: ", Viro360Type);
      console.log("bacgkround loop: ", Viro360Type);
      console.log("portal: ", portal);
      this.setState({
        background: background.data.name,
        elements: element.data,
        viro360Type: Viro360Type,
        loop: background.data.loop,
        portal: portal,
      });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    console.log(this.state, "this state in singlePortal");
    const returnComponent = this.state.background ? (
      // wrapper view
      <View>
        {/* title view */}
        <View>
          <Text>Header</Text>
        </View>
        {/* elements box view */}
        <View>
          {/* elements header view */}
          <View>
            <Text>Elements</Text>
          </View>
          {/* actual elements view
           */}
          <View>
            <Text>Elements go here</Text>
          </View>
        </View>
        {/* Thumbnail section view
         */}
        <View>
          {/* thumbail header view
           */}
          <View>
            <Text>thumbnail header</Text>
          </View>
          {/* Thumbnail view */}
          <TouchableOpacity
            onPress={() => {
              console.log(
                "state.portal when navigating from single portal to viro app",
                this.state.portal
              );
              this.props.navigation.navigate("ViroApp", {
                portal: this.state.portal,
                background: this.state.background,
                elements: this.state.elements,
                loop: this.state.loop,
                viro360Type: this.state.viro360Type
              });
            }}
          >
            <View>
              <Image
                source={images.thumbnails[this.state.portal.name]}
                style={{ width: 170, height: 116 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View />
    );

    return returnComponent;
  }
}

/* styles to put on stylesheet:
1. Header style for name of portal
2. sub-header style for list of elements
3. element box display
4. individual elements
5. thumbnail
*/