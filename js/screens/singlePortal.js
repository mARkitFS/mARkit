import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {images} from '../res/images';
import axios from 'axios';
// this is the view you get when clicking a portal from the viewer dashboard
// get portal ID from viewerDashboard, AJAX the portal + all of its elements
// display a thumbnail (clickable, on click navigates to MainScene)
// components: name of portal, list of elements,thumbnail
import {Viro360Video, Viro360Image} from 'react-viro';
export default class SinglePortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: 'party',
      elements: [],
      viro360Type: Viro360Video,
      loop: true,
      portal: {},
    };
  }
  async componentDidMount() {
    const {navigation} = this.props;
    const {portal} = navigation.state.params;
    const {screen} = navigation.state.params;
    const {userId} = navigation.state.params;
    const portalId = portal.id;
    try {
      const element = await axios.get(
        `http://10.1.85.95:8080/api/elementprops/portal/${portalId}`,
      );
      const background = await axios.get(
        `http://10.1.85.95:8080/api/backgrounds/${portal.backgroundId}`,
      );
      let Viro360Type =
        background.data.type === 'Viro360Video' ? Viro360Video : Viro360Image;
      console.log('background: ', background.data.name);
      console.log('element: ', element.data);
      console.log('viro360Type: ', Viro360Type);
      console.log('bacgkround loop: ', Viro360Type);
      console.log('portal: ', portal);
      console.log('screen: ', screen);
      this.setState({
        background: background.data.name,
        elements: element.data,
        viro360Type: Viro360Type,
        loop: background.data.loop,
        portal: portal,
        screen: screen,
        userId: userId,
      });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    console.log(this.state, 'this state in singlePortal');
    const image = images.portalThumbnails[this.state.portal.name] ? (
      <Image
        source={images.portalThumbnails[this.state.portal.name]}
        style={{width: 340, height: 232}}
      />
    ) : (
      <Image
        source={images.portalThumbnails.default}
        style={{width: 340, height: 232}}
      />
    );
    const returnComponent = this.state.background ? (
      // wrapper view
      <View style={styles.container}>
        {/* title view */}
        <View>
          <Text>{this.state.portal.name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log(
                'state.portal when navigating from single portal to viro app',
                this.state.portal,
              );
              this.props.navigation.navigate('ViroApp', {
                portal: this.state.portal,
                background: this.state.background,
                elements: this.state.elements,
                loop: this.state.loop,
                viro360Type: this.state.viro360Type,
                screen: this.state.screen,
                userId: this.state.userId,
              });
            }}>
            <View>{image}</View>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View />
    );
    return returnComponent;
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 50,
    flex: 1,
  },
});
