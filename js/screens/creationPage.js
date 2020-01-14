import React, {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  FlatList,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import axios from 'axios';

import PreviewImage from './previewImage';
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
      saveButton: 'Save',
      portal: {},
      text: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let {
      userId,
      selectedElements,
      selectedBackground,
    } = this.props.navigation.state.params;

    try {
      const backgrounds = await axios.get(
        `https://vast-falls-27580.herokuapp.com/api/backgrounds`,
      );
      console.log('CDM background ajax call: ', backgrounds);
      const elements = await axios.get(`https://vast-falls-27580.herokuapp.com/api/elements`);
      console.log('CDM element ajax call: ', elements);
      this.setState({
        allBackgrounds: backgrounds.data,
        allElements: elements.data,
        userId: userId,
      });
      if (Array.isArray(selectedElements)) {
        console.log('hitting selected elements if block ', selectedElements);
        this.setState({
          selectedElements: [...selectedElements],
        });
      }
      if (selectedBackground) {
        this.setState({
          selectedBackground: selectedBackground,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addPortal() {
    let portalObj = {
      name: this.state.text,
      type: 'custom',
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/defaults/portal.png',
      backgroundId: this.state.selectedBackground.id,
      userId: this.state.userId,
    };
    try {
      const newPortal = await axios.post(
        'https://vast-falls-27580.herokuapp.com/api/portals/add',
        portalObj,
      );

      const {data} = await axios.get(
        `https://vast-falls-27580.herokuapp.com/api/portals/${newPortal.data.id}`,
      );

      console.log('newPortal:>>>>', newPortal.data);
      this.addPortels(newPortal.data.id);
      this.addElementProps(newPortal.data.id);
      this.setState({
        portal: data,
        saveButton: `Portal ${data.name} created`,
      });
    } catch (err) {
      if (err.response.data === 'Validation error') {
        if (this.state.text.length < 1) {
          Alert.alert(
            'Portal name is required',
            'Please provide a portal name!',
          );
        } else {
          Alert.alert(
            'Portal name is not unique',
            'The portal name you entered already exists. Please choose another portal name.',
          );
        }
      }
    }

    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1500,
    }).start();
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }
  addElementProps(portalId) {
    let elementArr = this.state.selectedElements.map(el => el.id);
    elementArr.forEach(async el => {
      let position = this.getRandomPosition();
      let elementPropsObj = {
        elementId: el,
        portalId: portalId,
        scale: [0.01, 0.01, 0.01],
        position: position,
      };
      try {
        const newElementProps = await axios.post(
          'https://vast-falls-27580.herokuapp.com/api/elementprops/add',
          elementPropsObj,
        );
        console.log('newElementProps: ', newElementProps);
      } catch (error) {
        console.error(error);
      }
    });
  }

  getRandomPosition() {
    let positionArr = [];
    for (let i = 0; i < 3; i++) {
      let num = Math.random() * (8 - i * 2) - 3;
      positionArr.unshift(num);
    }
    return positionArr;
  }

  addPortels(portalId) {
    let elementArr = this.state.selectedElements.map(el => el.id);
    let setElementArr = new Set(elementArr);
    setElementArr.forEach(async el => {
      let portelObj = {
        elementId: el,
        portalId: portalId,
      };
      try {
        const newPortel = await axios.post(
          'https://vast-falls-27580.herokuapp.com/api/portels/add',
          portelObj,
        );
        console.log('newPortel: ', newPortel);
      } catch (error) {
        console.error(error);
      }
    });
  }

  handleSubmit() {
    console.log(this.state.selectedBackground, 'this selected background');
    if (!this.state.selectedBackground.name) {
      Alert.alert('Background required', 'Please select a background!');
      return;
    }
  }

  render() {
    console.log('state at creation page: ', this.state);
    const selectedBackgroundDisplay = this.state.selectedBackground.name ? (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>Selected background:</Text>
        </View>
        <PreviewImage item={this.state.selectedBackground} />
      </View>
    ) : (
      <View />
    );
    const selectedElements =
      this.state.selectedElements.length > 0 ? (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text>Selected elements:</Text>
          </View>
          <FlatList
            style={styles.container}
            data={this.state.selectedElements}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <PreviewImage item={item} />}
          />
        </View>
      ) : (
        <View />
      );
    const {navigate} = this.props.navigation;
    const interpolatedColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['black', '#0B3142'],
    });
    return (
      // wrapper view
      <Animated.View
        style={{
          marginTop: 40,
          flex: 1,
          // flexDirection: 'column',
          backgroundColor: interpolatedColor,
          // justifyContent: 'space-around',
        }}>
        {/* wrapper for background */}
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{backgroundColor: '#FDB327', margin: 10, borderRadius: 10}}
            onPress={() =>
              navigate('Swipe', {
                items: this.state.allBackgrounds,
                type: 'background',
                userId: this.state.userId,
                selectedElements,
              })
            }>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              Choose your background
            </Text>
          </TouchableOpacity>
          {/* view for list of backgrounds */}
        </View>
        {/* element header view */}
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{backgroundColor: '#FDB327', margin: 10, borderRadius: 10}}
            onPress={() =>
              navigate('Swipe', {
                items: this.state.allElements,
                type: 'element',
                userId: this.state.userId,
                selectedBackground: this.state.selectedBackground,
              })
            }>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              Choose your elements
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {/* view for previewbutton */}
          <TouchableOpacity
            // title="Preview your work"
            onPress={() =>
              navigate('PreviewPortal', {
                items: [
                  this.state.selectedBackground,
                  ...this.state.selectedElements,
                ],
                userId: this.state.userId,
              })
            }
            style={{
              width: 400,
              backgroundColor: '#FDB327',
              paddingTop: 10,
              paddingBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginLeft: 7,
            }}>
            <Text style={{fontSize: 20}}>Preview your work</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

export default withNavigation(CreationPage);

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#D6D3F0',
  },
  input: {
    height: 60,
    width: 250,
    backgroundColor: '#D6D3F0',
  },
  loader: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Academy Engraved LET',
    fontSize: 16,
    color: '#0B3142',
    textAlign: 'center',
  },
});
