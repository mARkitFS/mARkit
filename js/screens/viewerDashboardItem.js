import React, { Component } from 'react';
import { Button, Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { images } from '../res/images';

export default class ViewerDashboardItem extends Component {
  render() {
  return (
    <View
      // key={portal.id}
      style={styles.container}
    >
      <View style={styles.name}>
        <Text>{this.props.item.name}</Text>
      </View>
      <View style={styles.image}>
        <Image
          style={styles.imageInRow}
          source={images.thumbnails[this.props.item.name]}
        />
      </View>
        <TouchableOpacity>
          <View style={styles.navButton}>
            <Button
              title="Enter portal"
              onPress={() => {
                console.log('portal id when navigating', this.props.item.id);
                this.props.navigation.navigate('SinglePortal', {
                  portal: this.props.item
                });
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 2,
    maxHeight: 50,
    margin: 20,
    borderColor: '#0000ff',
    borderWidth: 2,
    flexDirection: 'row'
  },
  name: {
    padding: 3,
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    alignItems: 'stretch'
  },
  imageInRow: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  navButton: {
    flex: 1,
    alignItems: 'stretch'
  }
});

