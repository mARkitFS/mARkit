import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {images} from '../res/images';
import BackgroundItem from './backgroundItem';
import ElementItem from './elementItem';
import {withNavigation} from 'react-navigation';
import Swipe from './swipe';

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
    this.addElement = this.addElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
  }

  async componentDidMount() {
    let {userId} = this.props.navigation.state.params;
    const backgrounds = await axios.get(
      `http://192.168.0.112:8080/api/backgrounds`,
    );
    const elements = await axios.get(`http://192.168.0.112:8080/api/elements`);
    this.setState({
      allBackgrounds: backgrounds.data,
      allElements: elements.data,
      userId: userId,
    });
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
  addElement(item) {
    this.setState(prevState => ({
      selectedElements: [
        ...prevState.selectedElements,
        {...item, type: 'element'},
      ],
    }));
  }
  removeElement(elementId) {
    // filter out one item with the given ID
    const prevSelected = this.state.selectedElements.slice(0);
    // find the first idx of such an item, return sliced fragments without it.
    // reduce the array of items into an array of itemIDs, use the indexOf to slice
    const dropThisIndex = prevSelected.findIndex(
      element => element.id === elementId,
    );
    if (dropThisIndex < 0) {
      Alert.alert(
        'Nothing to remove',
        'You do not have any instances of this element in your portal.',
      );
      return;
    }
    this.setState({
      selectedElements: [
        ...prevSelected.slice(0, dropThisIndex),
        ...prevSelected.slice(dropThisIndex + 1),
      ],
    });
  }

  // renderElements() {
  //   return this.state.allElements.map((element, idx) => (
  //     <ElementSwipe element={element} />
  //   ));
  // }

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
    console.log('state on creation page', this.state);
    const {navigate} = this.props.navigation;
    return (
      // wrapper view
      <View style={{marginTop: 40}}>
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
        {/* element header view */}

        <TouchableOpacity
          style={{backgroundColor: '#DDDDDD'}}
          onPress={() =>
            navigate('Swipe', {items: this.state.allElements, type: 'element'})
          }>
          <Text style={{fontSize: 20}}>Choose your elements</Text>
        </TouchableOpacity>

        <View style={{flex: 1, position: 'absolute', alignSelf: 'flex-end'}}>
          {/* view for previewbutton */}
          <Button title="Preview your work" onPress={this.handleSubmit} />
        </View>
      </View>
    );
  }
}

export default withNavigation(CreationPage);
