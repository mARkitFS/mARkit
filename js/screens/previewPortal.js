import React, { Component } from 'react';
<<<<<<< HEAD
import { Button, Text, TextInput, View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import PreviewImage from './previewImage'
=======
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import PreviewImage from './previewImage';
>>>>>>> master
import { images } from '../res/images';
import axios from 'axios';

export default class PreviewPortal extends Component {
  constructor() {
    super();
    this.state = {
      saveButton: 'Save',
      items:[],
      portal: {},
      text: ''
    };
  }

  async componentDidMount() {
<<<<<<< HEAD
    let items = this.props.navigation.state.params.items
    this.setState({items: items})
  }

  async addPortal () {
    let portalObj = {
      name: this.state.text,
      type: 'custom',
      imageURL: 'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/portal.png',
      backgroundId: this.state.items[0].id,
      userId: 2
    }
    try{
      const newPortal = await axios.post('http://10.1.85.88:8080/api/portals/add', portalObj)
      const { data } = await axios.get(`http://10.1.85.88:8080/api/portals/${newPortal.data.id}`)

      console.log('newPortal:>>>>', newPortal.data)
      this.addPortels(newPortal.data.id)
      this.addElementProps(newPortal.data.id)
      this.setState({portal:data, saveButton: `Portal ${data.name} created`})
    }catch(err){
      console.log(err)
=======
    const { navigation } = this.props;
    const { portal } = navigation.state.params;
    try {
      const element = await axios.get(`http://10.1.85.96:8080/api/elements`);
      const background = await axios.get(
        `http://10.1.85.96:8080/api/backgrounds/1`
      );
      console.log('<<<<<<element: ', element.data);
      let data = [background.data, ...element.data];
      this.setState({ items: data });
    } catch (err) {
      console.error(err);
>>>>>>> master
    }
  }

  addElementProps(portalId){
    let elementArr = this.state.items
                  .filter(el => el.type != 'background')
                  .map(el => el.id)
    elementArr.forEach(async (el) => {
      let elementPropsObj = {
        elementId: el,
        portalId: portalId,
        scale: [0.01, 0.01, 0.01],
        position: [1,1.5,-5]
      }
      try {
        const newElementProps = await axios.post('http://10.1.85.88:8080/api/elementprops/add', elementPropsObj)
        console.log('newElementProps: ', newElementProps)
        } catch (error) {
      }
    })
}

  addPortels(portalId){
  let elementArr = this.state.items
                .filter(el => el.type != 'background')
                .map(el => el.id)
  let setElementArr = new Set(elementArr)
  setElementArr.forEach(async (el) => {
    let portelObj = {
      elementId: el,
      portalId: portalId
    }
    try {
      const newPortel = await axios.post('http://10.1.85.88:8080/api/portels/add', portelObj )
      console.log('newPortel: ', newPortel)
    } catch (error) {
      }
  })
}


  render() {
<<<<<<< HEAD
    console.log('current state in previewPortal: ', this.state)

    let elementArr = this.state.items.filter(el => el.type != 'background')
                      .map(el => el.id)
    console.log('elementArr: ', elementArr)
    if (this.state.items.length === 0){
=======
    // console.log('the props in previewPortal', this.props.navigation.);
    // console.log('the props in previewPortal', navigation);
    if (this.state.items.length === 0) {
>>>>>>> master
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
<<<<<<< HEAD
      <View style={styles.loader}>
          <Text>Preview your portal selections: </Text>
          <TextInput
            style={{height: 40, width: 150}}
            placeholder="Portal name"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Button
            title={this.state.saveButton}
            onPress={() => {
              console.log('state: ', this.state);
             this.addPortal()
            }}
          />
          <Button
            title="View Portal"
            onPress={() => {
              console.log('portal id when navigating', this.state.portal.id);
              this.props.navigation.navigate('SinglePortal', {
                portal: this.state.portal
              });
            }}
          />
        <FlatList
          style = {styles.container}
          data = {this.state.items}
          keyExtractor = {(item, index) => index.toString()}
          renderItem = {({item}) => <PreviewImage item = {item} />}
        />
      </View>
    )
=======
      <FlatList
        style={styles.container}
        data={this.state.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PreviewImage item={item} />}
      />
    );
>>>>>>> master
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
});
