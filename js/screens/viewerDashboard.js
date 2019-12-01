import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import axios from 'axios';

import { images } from '../res/images';
const styles = StyleSheet.create({
  imageInRow: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
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
      const { data } = await axios.get(`http://192.168.0.112:8080/api/portals`);
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
          alignSelf: 'stretch',
          maxHeight: 50,
          margin: 20,
          borderColor: '#0000ff',
          borderWidth: 3,
          flexDirection: 'row'
        }}
      >
        <View style={{ padding: 3 }}>
          <Text>{portal.name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.imageInRow}
            source={images.thumbnails[portal.name]}
          />
        </View>
        <View style={{ flex: 1 }}>
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
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.portals.map(portal => {
          return this.renderRow(portal);
        })}
      </View>
    );
  }
}
