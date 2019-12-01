import React, { Component } from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import axios from 'axios';
import { images } from '../res/images';

const backgroundsDummy = [
  {
    id: 2,
    name: 'beach_vacation',
    uri:
      'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/guadalupe_360.jpg',
    type: 'Viro360Image',
    loop: false,
    createdAt: '2019-11-30T01:55:49.696Z',
    updatedAt: '2019-11-30T01:55:49.696Z',
    userId: 1
  },
  {
    id: 1,
    name: 'party_event',
    uri:
      'https://raw.githubusercontent.com/mARkitFS/mARkit//master/js/res/Kaleidoscope.mp4',
    type: 'Viro360Video',
    loop: true,
    createdAt: '2019-11-30T01:55:49.696Z',
    updatedAt: '2019-11-30T01:55:49.696Z',
    userId: 1
  }
];

const elementsDummy = [
  {
    id: 1,
    name: 'heart',
    type: 'VRX',
    uri:
      'https://raw.githubusercontent.com/mARkitFS/mARkit/master/assets/emoji_heart/emoji_heart.vrx',
    createdAt: '2019-11-30T01:55:49.673Z',
    updatedAt: '2019-11-30T01:55:49.673Z',
    userId: 1
  },
  {
    id: 2,
    name: 'fox',
    type: 'OBJ',
    uri:
      'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/low-poly-fox-by-pixelmannen.obj',
    createdAt: '2019-11-30T01:55:49.673Z',
    updatedAt: '2019-11-30T01:55:49.673Z',
    userId: 1
  }
];

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
      `https://vast-falls-27580.herokuapp.com/api/backgrounds`
    );
    const elements = await axios.get(`https://vast-falls-27580.herokuapp.com/api/elements`);
    this.setState({
      allBackgrounds: backgrounds.data,
      allElements: elements.data
    });
  }

  removeItem() {}

  renderBackground({ item }) {
    return (
      <View key={item.id}>
        <View>
          <Text>{item.name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: images.thumbnails[item.name].uri }}
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

  renderElement({ item }) {
    return (
      <View key={item.id}>
        <View>
          <Text>{item.name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: images.element[item.name].url }}
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
          <Button
            title="remove"
            onPress={() => this.setState({ elements: [] })}
          />
        </View>
      </View>
    );
  }

  render() {
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
              data={backgroundsDummy}
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
            <FlatList data={elementsDummy} renderItem={this.renderElement} />
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
