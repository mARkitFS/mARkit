import React, { Component } from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import axios from 'axios';
import { images } from '../res/images';

// this page will contain all the tools available to creators
class CreationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBackgrounds: [],
      allElements: [],
      selectedBackground: {},
      selectedElements: []
    };
    this.renderBackground = this.renderBackground.bind(this);
    this.renderElement = this.renderElement.bind(this);
  }

  async componentDidMount() {
    const backgrounds = await axios.get(
      `http://10.1.85.96:8080/api/backgrounds`
    );
    const elements = await axios.get(`http://10.1.85.96:8080/api/elements`);
    console.log({ elements });
    console.log({ backgrounds });
    this.setState({
      allBackgrounds: backgrounds.data,
      allElements: elements.data
    });
  }

  renderBackground({ item }) {
    return (
      <View key={item.id}>
        <View>
          <Text>{item.name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: images.backgroundThumbnails[item.name].uri }}
            style={{
              width: 70,
              height: 70
            }}
          />
        </View>
        <View>
          <Button
            title="add"
            onPress={() =>
              this.setState({
                selectedBackground: { ...item, type: 'background' }
              })
            }
          />
          <Button
            title="remove"
            onPress={() => this.setState({ selectedBackground: {} })}
          />
        </View>
      </View>
    );
  }
  removeElement(elementId) {
    // filter out one item with the given ID
    const prevSelected = this.state.selectedElements.slice(0);
    // find the first idx of such an item, return sliced fragments without it.
    // reduce the array of items into an array of itemIDs, use the indexOf to slice
    const dropThisIndex = prevSelected.findIndex(
      element => element.id === elementId
    );
    this.setState({
      selectedElements: [
        ...prevSelected.slice(0, dropThisIndex),
        ...prevSelected.slice(dropThisIndex + 1)
      ]
    });
  }

  renderElement({ item }) {
    return (
      <View key={item.id}>
        <View>
          <Text>{item.name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: images.element[item.name].uri }}
            style={{
              width: 90,
              height: 90
            }}
          />
        </View>
        <View>
          <Button
            title="add"
            onPress={() =>
              this.setState(prevState => ({
                selectedElements: [
                  ...prevState.selectedElements,
                  { ...item, type: 'element' }
                ]
              }))
            }
          />
          <Button title="remove" onPress={() => this.removeElement(item.id)} />
        </View>
      </View>
    );
  }

  render() {
    console.log('state on creation page', this.state);
    return (
      // wrapper view
      <View>
        {/* wrapper for background */}
        <View>
          {/* background header view */}
          <View>
            <Text>Choose your background:</Text>
          </View>
          {/* view for list of backgrounds */}
          <View>
            <FlatList
              data={this.state.allBackgrounds}
              renderItem={this.renderBackground}
            />
          </View>
        </View>
        {/* wrapper for elements list */}
        <View>
          {/* element header view */}
          <View>
            <Text>Choose your elements:</Text>
          </View>
          {/* view for list of elements */}
          <View>
            <FlatList
              data={this.state.allElements}
              renderItem={this.renderElement}
            />
          </View>
        </View>
        <View style={{ flex: 1, position: 'absolute', alignSelf: 'flex-end' }}>
          {/* view for previewbutton */}
          <Button
            title="Preview your work"
            onPress={() => {
              console.log('state: ', this.state);
              this.props.navigation.navigate('PreviewPortal', {
                items: [
                  this.state.selectedBackground,
                  ...this.state.selectedElements
                ]
              });
            }}
          />
        </View>
      </View>
    );
  }
}

export default CreationPage;
