import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import PreviewImage from './previewImage'
import { images } from '../res/images';
import axios from 'axios';

export default class PreviewPortal extends Component {
  constructor() {
    super();
    this.state = {
      items:[]
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { portal } = navigation.state.params;
    try {
      const element = await axios.get(
        `http://192.168.0.238:8080/api/elements`
      );
      const background = await axios.get(
        `http://192.168.0.238:8080/api/backgrounds/1`
      );
      console.log('<<<<<<element: ',element.data )
      let data = [background.data, ...element.data]
      this.setState({items:data})
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    // console.log('the props in previewPortal', this.props.navigation.);
    // console.log('the props in previewPortal', navigation);
    if(this.state.items.length === 0){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size = "large" />
        </View>
      )
    }
    return (
      <FlatList
        style = {styles.container}
        data = {this.state.items}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({item}) => <PreviewImage item = {item} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 20,
    backgroundColor: '#F5FCFF'
  },
  loader: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})

