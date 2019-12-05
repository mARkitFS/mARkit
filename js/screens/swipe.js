import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  Image,
  Dimensions,
  PanResponder,
} from 'react-native';
import {images} from '../res/images';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Swipe extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = {
      curIdx: 0,
      panResponder: PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          this.position.setValue({x: gestureState.dx, y: gestureState.dy});
        },
        onPanResponderRelease: (evt, gestureState) => {},
      }),
    };
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });

    this.rotateAndTranslate = {
      transform: [
        {rotate: this.rotate},
        ...this.position.getTranslateTransform(),
      ],
    };
  }

  renderItems = () => {
    const {items} = this.props.navigation.state.params;
    const {type} = this.props.navigation.state.params;
    console.log('type: ', type, 'items: ', items);
    return items.map((item, idx) => {
      if (idx < this.state.curIdx) {
        return null;
      }
      if (idx === this.state.curIdx) {
        return (
          <Animated.View
            {...this.state.panResponder.panHandlers}
            key={item.id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute',
                backgroundColor: '#f5f5f5',
              },
            ]}>
            {/* UI goes here */}
            <Animated.View
              style={{
                transform: [{rotate: '-30deg'}],
                position: 'absolute',
                top: 50,
                bottom: 70,
                zIndex: 1000,
                left: 100,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 32,
                  fontWeight: 800,
                  padding: 10,
                }}>
                Add one
              </Text>
            </Animated.View>
            {/* image goes here */}
            <Image
              style={{
                flex: 1,
                maxHeight: SCREEN_HEIGHT,
                maxWidth: SCREEN_WIDTH - 20,
                resizeMode: 'center',
                borderRadios: 20,
              }}
              source={{uri: images[type][item.name].url}}
            />
          </Animated.View>
        );
      } else {
        <Animated.View
          key={item.id}
          style={{
            height: SCREEN_HEIGHT - 120,
            width: SCREEN_WIDTH,
            padding: 10,
            position: 'absolute',
            backgroundColor: '#f5f5f5',
          }}>
          {/* animation goes here */}
          <Image
            style={{
              flex: 1,
              maxHeight: SCREEN_HEIGHT,
              maxEidth: SCREEN_WIDTH - 20,
              resizeMode: 'center',
              borderRadios: 20,
            }}
            source={{uri: images[type][item.name].url}}
          />
        </Animated.View>;
      }
    });
  };
  render = () => {
    return (
      <View>
        <View style={{height: 60}}>{/* header view */}</View>
        <View style={{flex: 1}}>
          {/* content view */}
          {this.renderItems()}
        </View>
        <View style={{height: 60}}>{/* footer view */}</View>
      </View>
    );
  };
}
