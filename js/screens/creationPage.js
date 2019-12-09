import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import BackgroundItem from './backgroundItem';
import ElementItem from './elementItem';
import styled from 'styled-components';

import {withNavigation} from 'react-navigation';

// this page will contain all the tools available to creators
class CreationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBackgrounds: [],
      allElements: [],
      selectedBackground: {},
      selectedElements: [],
      userId: 0,
    };
    this.renderBackground = this.renderBackground.bind(this);
    // this.renderElements = this.renderElements.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBackground = this.addBackground.bind(this);
    this.removeBackground = this.removeBackground.bind(this);
    // this.removeElement = this.removeElement.bind(this);
  }

  async componentDidMount() {
    let {
      userId,
      selectedElements,
      selectedBackground,
    } = this.props.navigation.state.params;

    const backgrounds = await axios.get(
      `http://10.1.85.95:8080/api/backgrounds`,
    );
    const elements = await axios.get(`http://10.1.85.95:8080/api/elements`);
    this.setState({
      allBackgrounds: backgrounds.data,
      allElements: elements.data,
      userId: userId,
    });
    if (selectedElements) {
      this.setState({
        selectedElements: [...selectedElements],
      });
    }
    if (selectedBackground) {
      this.setState({
        selectedBackground: selectedBackground,
      });
    }
  }

  renderBackground({item}) {
    return (
      <BackgroundItem
        item={item}
        addBackground={this.addBackground}
        removeBackground={this.removeBackground}
      />
    );
  }
  removeBackground() {
    this.setState({selectedBackground: {}});
  }
  addBackground(item) {
    this.setState({
      selectedBackground: {...item, type: 'background'},
    });
  }

  handleSubmit() {
    console.log(this.state.selectedBackground, 'this selected background');
    if (!this.state.selectedBackground.name) {
      Alert.alert('Background required', 'Please select a background!');
      return;
    }
    this.props.navigation.navigate('PreviewPortal', {
      items: [this.state.selectedBackground, ...this.state.selectedElements],
      userId: this.state.userId,
    });
  }

  render() {
    const selectedBackground = this.state.selectedBackground.name
      ? this.state.selectedBackground
      : null;
    const selectedElements =
      this.state.selectedElements.length > 0
        ? [...this.state.selectedElements]
        : null;
    console.log('state on creation page', this.state);
    const {navigate} = this.props.navigation;
    return (
      // wrapper view

      <View
        style={{
          marginTop: 40,
          flex: 1,
          flexDirection: 'column',
          // justifyContent: 'space-around',
        }}>
        {/* wrapper for background */}
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{backgroundColor: '#DDDDDD'}}
            onPress={() =>
              navigate('Swipe', {
                items: this.state.allBackgrounds,
                type: 'background',
                userId: this.state.userId,
                selectedElements,
              })
            }>
            <Text style={{fontSize: 20}}>Choose your background</Text>
          </TouchableOpacity>
          {/* view for list of backgrounds
          <View>
            <FlatList
              data={this.state.allBackgrounds}
              renderItem={this.renderBackground}
            />
          </View> */}
        </View>
        {/* element header view */}
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{backgroundColor: '#DDDDDD'}}
            onPress={() =>
              navigate('Swipe', {
                items: this.state.allElements,
                type: 'element',
                userId: this.state.userId,
                selectedBackground,
              })
            }>
            <Text style={{fontSize: 20}}>Choose your elements</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignSelf: 'flex-end'}}>
          {/* view for previewbutton */}
          <TouchableOpacity
            // title="Preview your work"
            onPress={this.handleSubmit}
            style={{
              width: 400,
              backgroundColor: '#FDB327',
              paddingTop: 10,
              paddingBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text>Preview your work</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(CreationPage);
