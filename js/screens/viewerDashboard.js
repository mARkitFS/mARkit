import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';

import { images } from '../res/images';
const styles = StyleSheet.create({
  imageInRow: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  navButton: {
    width: 50,
    height: 50
  }
});

// creating a row class to instantiate a row from
export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { portals: [] };
  }
  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://vast-falls-27580.herokuapp.com/api/portals`
      );
      this.setState({ portals: data });
    } catch (err) {
      console.error(err);
    }
  }
  renderRow(portal) {
    return (
      <View
        key={portal.id}
        style={{
          flex: 2,
          maxHeight: 50,
          margin: 20,
          borderColor: '#0000ff',
          borderWidth: 2,
          flexDirection: 'row'
        }}
      >
        <View style={{ padding: 3, flex: 1, alignItems: 'stretch' }}>
          <Text>{portal.name}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <Image
            style={styles.imageInRow}
            source={images.thumbnails[portal.name]}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <Button
            title="Enter portal"
            onPress={() => {
              console.log('portal id when navigating', portal.id);
              this.props.navigation.navigate('SinglePortal', {
                portal: portal
              });
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    console.log('portals on state', this.state.portals);
    return (
      <View
        style={{
          flex: 2,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#b2b2ff'
        }}
      >
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {this.state.portals.map(portal => {
            return this.renderRow(portal);
          })}
        </View>
        {/* navbar */}
        <View
          style={{
            flex: 1,
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            borderColor: '#fff',
            borderWidth: 3
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('Homepage');
              }}
            >
              <Image source={require('../res/icon_close_w.png')} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('ViewerDashboard');
              }}
            >
              <Image source={require('../res/icon_close_w.png')} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('CreatorDashboard', {
                  userId: 1
                });
              }}
            >
              <Image source={require('../res/icon_close_w.png')} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
