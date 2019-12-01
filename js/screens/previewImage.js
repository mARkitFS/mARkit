import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { images } from '../res/images';

export default class PreviewImage extends Component {
  render() {
    console.log('<<<<<props in previewItem: ', this.props.item.name)
    console.log('<<<<<<<uri: ', images.element[this.props.item.name])
    const type = 'element'
    return (
        <TouchableOpacity style = {styles.card}>
          <Image style={styles.cardImage} source = {{uri: images[type][this.props.item.name].url}}></Image>
          <Text style={styles.cardText}>{this.props.item.type}</Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardImage: {
    width: '85%',
    height: 200,
    resizeMode: 'cover'
  },
  cardText: {
    padding: 10,
    fontSize: 16
  }

})
