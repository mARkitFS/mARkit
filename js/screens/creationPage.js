import React, {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

import PreviewImage from './previewImage';
import BackgroundItem from './backgroundItem';
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
    // this.renderBackground = this.renderBackground.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.addBackground = this.addBackground.bind(this);
    // this.removeBackground = this.removeBackground.bind(this);
  }

  async componentDidMount() {
    let {
      userId,
      selectedElements,
      selectedBackground,
    } = this.props.navigation.state.params;
    try {
      const backgrounds = await axios.get(
        `http://192.168.0.112:8080/api/backgrounds`,
      );
      console.log('CDM background ajax call: ', backgrounds);
      const elements = await axios.get(
        `http://192.168.0.112:8080/api/elements`,
      );
      console.log('CDM element ajax call: ', elements);
      this.setState({
        allBackgrounds: backgrounds.data,
        allElements: elements.data,
        userId: userId,
      });
      if (Array.isArray(selectedElements)) {
        console.log('hitting selected elements if block ', selectedElements)
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
      backgroundId: this.state.selectedBackground,
      userId: this.state.userId,
    };
    try {
      const newPortal = await axios.post(
        'http://192.168.0.112:8080/api/portals/add',
        portalObj,
      );

      const {data} = await axios.get(
        `http://192.168.0.112:8080/api/portals/${newPortal.data.id}`,
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
          'http://192.168.0.112:8080/api/elementprops/add',
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
          'http://192.168.0.112:8080/api/portels/add',
          portelObj,
        );
        console.log('newPortel: ', newPortel);
      } catch (error) {
        console.error(error);
      }
    });
  }

  // renderBackground({ item }) {
  //   return (
  //     <BackgroundItem
  //       item={item}
  //       addBackground={this.addBackground}
  //       removeBackground={this.removeBackground}
  //     />
  //   );
  // }
  // removeBackground() {
  //   this.setState({ selectedBackground: {} });
  // }
  // addBackground(item) {
  //   this.setState({
  //     selectedBackground: { ...item, type: 'background' },
  //   });
  // }

  handleSubmit() {
    console.log(this.state.selectedBackground, 'this selected background');
    if (!this.state.selectedBackground.name) {
      Alert.alert('Background required', 'Please select a background!');
      return;
    }
    // this.props.navigation.navigate('PreviewPortal', {
    //   items: [this.state.selectedBackground, ...this.state.selectedElements],
    //   userId: this.state.userId,
    // });
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
    console.log('state on creation page', this.state);
    const {navigate} = this.props.navigation;
    return (
      // wrapper view
      <View
        style={{
          marginTop: 40,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
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
          {selectedBackgroundDisplay}
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
          <Button title="Preview your work" onPress={this.handleSubmit} />
        </View>
      </View>
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
