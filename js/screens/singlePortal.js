import React, { Component } from 'react';
import { View, Text } from 'react-native';
// this is the view you get when clicking a portal from the viewer dashboard

// get portal ID from viewerDashboard, AJAX the portal + all of its elements

// display a thumbnail (clickable, on click navigates to MainScene)
// components: name of portal, list of elements,thumbnail

export default class SinglePortal extends Component {
  render() {
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
          <View>
            <Text>Thumbnail will be here</Text>
          </View>
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
