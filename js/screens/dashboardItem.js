import React, { Component } from 'react';
import { Button, Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { images } from '../res/images';
import { withNavigation } from 'react-navigation'

class DashboardItem extends Component {
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
          source={images.portalThumbnails[this.props.item.name]}
        />
      </View>
        <TouchableOpacity>
          <View style={styles.navButton}>
            <Button
              title="Enter portal"
              onPress={() => {
                this.props.navigation.navigate('SinglePortal', {
                  portal: this.props.item,
                  screen: this.props.screen,
                  userId: this.props.userId
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
    maxHeight: 150,
    width: 250,
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
    width: 75,
    height: 50,
    resizeMode: 'contain'
  },
  navButton: {
    flex: 1,
    alignItems: 'stretch'
  }
});

export default withNavigation(DashboardItem)
