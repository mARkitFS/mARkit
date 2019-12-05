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
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx > 120) {
            Animated.spring(this.position, {
              toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
            }).start(() => {
              this.setState({curIdx: this.state.curIdx + 1}, () => {
                this.position.setValue({x: 0, y: 0});
              });
            });
          } else if (gestureState.dx < -120) {
            Animated.spring(this.position, {
              toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
            }).start(() => {
              this.setState({curIdx: this.state.curIdx + 1}, () => {
                this.position.setValue({x: 0, y: 0});
              });
            });
          } else {
            Animated.spring(this.position, {
              toValue: {x: 0, y: 0},
              friction: 4,
            }).start();
          }
        },
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
    this.nextCardOpadcity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });
  }

  renderItems = () => {
    const {items} = this.props.navigation.state.params;
    const {type} = this.props.navigation.state.params;
    console.log('type: ', type, 'items: ', items);
    return items
      .map((item, idx) => {
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
                  position: 'absolute',
                  top: 20,
                  bottom: 20,
                  zIndex: 1000,
                  left: 20,
                }}>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: 'green',
                    color: 'green',
                    fontSize: 25,
                    fontWeight: 800,
                    padding: 10,
                  }}>
                  Add one
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 20,
                  bottom: 20,
                  zIndex: 1000,
                  right: 20,
                }}>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: 'green',
                    color: 'green',
                    fontSize: 25,
                    fontWeight: 800,
                    padding: 10,
                  }}>
                  Remove one
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
          return (
            <Animated.View
              key={item.id}
              style={[
                {
                  opacity: this.nextCardOpadcity,
                  transform: [{scale: this.nextCardScale}],
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: 'absolute',
                  backgroundColor: '#f5f5f5',
                },
              ]}>
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 20,
                  bottom: 20,
                  zIndex: 1000,
                  left: 20,
                }}>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: 'green',
                    color: 'green',
                    fontSize: 25,
                    fontWeight: 800,
                    padding: 10,
                  }}>
                  Add one
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 20,
                  bottom: 20,
                  zIndex: 1000,
                  right: 20,
                }}>
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: 'green',
                    color: 'green',
                    fontSize: 25,
                    fontWeight: 800,
                    padding: 10,
                  }}>
                  Remove one
                </Text>
              </Animated.View>
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
            </Animated.View>
          );
        }
      })
      .reverse();
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
