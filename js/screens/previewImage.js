import React, { Component } from 'react';
import { Button, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { images } from '../res/images';

export default class PreviewImage extends Component {
  render() {
    return (
        <TouchableOpacity style = {styles.card}>
          <Image style={styles.cardImage} source = {{uri: images[this.props.item.type][this.props.item.name].url}}></Image>
          <Text style={styles.cardText}>{`${this.props.item.type}: ${this.props.item.name}`}</Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0B3142',
    marginBottom: 20,
    marginLeft: '5%',
    width: '85%',
    shadowColor: '#0B3142',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardImage: {
    width: '85%',
    height: 150,
    resizeMode: 'cover'
  },
  cardText: {
    padding: 5,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }

})
