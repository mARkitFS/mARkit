import React, {Component} from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import PreviewImage from './previewImage';
import {images} from '../res/images';
import axios from 'axios';

export default class PreviewPortal extends Component {
  constructor() {
    super();
    this.state = {
      saveButton: 'Save',
      items: [],
      portal: {},
      text: '',
      userId: 0,
    };
  }

  componentDidMount() {
    let items = this.props.navigation.state.params.items;
    let userId = this.props.navigation.state.params.userId;
    this.setState({
      items: items,
      userId: userId,
    });

    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1500,
    }).start();
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  async addPortal() {
    let portalObj = {
      name: this.state.text,
      type: 'custom',
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/defaults/portal.png',
      backgroundId: this.state.items[0].id,
      userId: this.state.userId,
    };
    try {
      const newPortal = await axios.post(
        'http://192.168.1.156:8080/api/portals/add',
        portalObj,
      );

      const {data} = await axios.get(
        `http://192.168.1.156:8080/api/portals/${newPortal.data.id}`,
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
    let elementArr = this.state.items
      .filter(el => el.type != 'background')
      .map(el => el.id);
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
          'http://192.168.1.156:8080/api/elementprops/add',
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
    let elementArr = this.state.items
      .filter(el => el.type != 'background')
      .map(el => el.id);
    let setElementArr = new Set(elementArr);
    setElementArr.forEach(async el => {
      let portelObj = {
        elementId: el,
        portalId: portalId,
      };
      try {
        const newPortel = await axios.post(
          'http://192.168.1.156:8080/api/portels/add',
          portelObj,
        );
        console.log('newPortel: ', newPortel);
      } catch (error) {
        console.error(error);
      }
    });
  }

  render() {
    if (this.state.items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const interpolatedColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['black', '#0B3142'],
    });
    return (
      <Animated.View
        style={{
          marginTop: 50,
          flex: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: interpolatedColor,
        }}>
        <View>
          <Text style={styles.title}>
            {' '}
            Preview your portal item selections:{' '}
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Portal Name"
          onChangeText={text => this.setState({text})}
          value={this.state.text}
        />
        <Button
          title={this.state.saveButton}
          onPress={() => {
            console.log('state: ', this.state);
            this.addPortal();
          }}
        />
        <Button
          title="View Portal"
          onPress={() => {
            console.log('portal id when navigating', this.state.portal.id);
            this.props.navigation.navigate('SinglePortal', {
              portal: this.state.portal,
              userId: this.state.userId,
              screen: 'CreatorDashboard',
            });
          }}
        />
        <FlatList
          style={styles.container}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <PreviewImage item={item} />}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    // backgroundColor: '#D6D3F0',
  },
  input: {
    height: 60,
    width: 250,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  loader: {
    // flex: 2,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});
