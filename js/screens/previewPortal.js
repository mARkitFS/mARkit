import React, { Component } from 'react';
import { Button, Text, View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import PreviewImage from './previewImage'
import { images } from '../res/images';
import axios from 'axios';

export default class PreviewPortal extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    let data = this.props.navigation.state.params.items
    this.setState({items: data})
  }

  async addPortal () {
    try{
      const {data} = await Axios.post('/api/students/add', student)
      dispatch(addedStudent(data))
    }catch(err){
      console.log(err)
    }
  }


  render() {

    if (this.state.items.length === 0){
      return (
        <View style={styles.loader}>
          <ActivityIndicator size = "large" />
        </View>
      )
    }
    return (
      <View style={styles.loader}>
          <Text>Preview your portal selections: </Text>
          <Button
            title="Save"
            // onPress={() => {
            //   console.log('state: ', this.state);
            //   this.props.navigation.navigate('PreviewPortal', {
            //     items: [
            //       this.state.selectedBackground,
            //       ...this.state.selectedElements
            //     ]
            //   });
            // }}
          />
          <Button
            title="View Portal"
            // onPress={() => {
            //   console.log('state: ', this.state);
            //   this.props.navigation.navigate('PreviewPortal', {
            //     items: [
            //       this.state.selectedBackground,
            //       ...this.state.selectedElements
            //     ]
            //   });
            // }}
          />
        <FlatList
          style = {styles.container}
          data = {this.state.items}
          keyExtractor = {(item, index) => index.toString()}
          renderItem = {({item}) => <PreviewImage item = {item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#F5FCFF'
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

