import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { images } from "../res/images";
// this is the view you get when clicking a portal from the viewer dashboard

// get portal ID from viewerDashboard, AJAX the portal + all of its elements

// display a thumbnail (clickable, on click navigates to MainScene)
// components: name of portal, list of elements,thumbnail

// const portalId = 1;

export default class SinglePortal extends Component {
  render() {
    console.log(
      this.props.navigation.state.params.portal,
      "this props navigation state params portal in singlePortal"
    );
    const { navigation } = this.props;
    const { portal } = navigation.state.params;
    const portalId = portal.id;
    return (
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
                "portal id when navigating from single portal to viro app",
                portalId
              );
              this.props.navigation.navigate("ViroApp", {
                portalId: portalId,
              });
            }}
          >
            <View>
              <Image
                source={images.thumbnails[portal.name]}
                style={{ width: 170, height: 116 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/* styles to put on stylesheet:
1. Header style for name of portal
2. sub-header style for list of elements
3. element box display
4. individual elements
5. thumbnail
*/
