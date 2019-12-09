import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  Image,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  Alert,
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
      arrayLength: 0,
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
              if (this.state.curIdx >= this.state.arrayLength) {
                this.setState({curIdx: -1});
              }
              this.setState({curIdx: this.state.curIdx + 1}, () => {
                this.position.setValue({x: 0, y: 0});
              });
            });
          } else if (gestureState.dx < -120) {
            Animated.spring(this.position, {
              toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
            }).start(() => {
              if (this.state.curIdx >= this.state.arrayLength) {
                this.setState({curIdx: -1});
              }
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
      selectedElements: [],
      selectedBackground: {},
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);

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
  componentDidMount() {
    const {
      selectedBackground,
      selectedElements,
    } = this.props.navigation.state.params;
    if (selectedBackground) {
      this.setState({selectedBackground: selectedBackground});
    }
    if (selectedElements) {
      this.setState({
        selectedElements: [...this.state.selectedElements, ...selectedElements],
      });
    }
    this.setState({
      arrayLength: this.props.navigation.state.params.items.length,
    });
  }

  add(item) {
    if (item.type === 'element') {
      this.setState(prevState => ({
        selectedElements: [
          ...prevState.selectedElements,
          {...item, type: 'element'},
        ],
      }));
    } else if (item.type === 'background') {
      this.setState({
        selectedBackground: item,
      });
    }
  }
  remove(item) {
    if (item.type === 'element') {
      // filter out one item with the given ID
      const prevSelected = [...this.state.selectedElements];
      // find the first idx of such an item, return sliced fragments without it.
      // reduce the array of items into an array of itemIDs, use the indexOf to slice
      const dropThisIndex = prevSelected.findIndex(
        element => element.id === item.id,
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
    } else if (item.type === 'background') {
      this.setState({selectedBackground: {}});
    }
  }
  renderItems = () => {
    const {items, type, userId} = this.props.navigation.state.params;
    const {navigate} = this.props.navigation;
    console.log('length of array: ', items.length);
    console.log('current index in state: ', this.state.curIdx);

    return items
      .map((item, idx) => {
        if (idx < this.state.curIdx) {
          return null;
        }

        if (idx === this.state.curIdx && idx < items.length) {
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
              {/* UI goes here */}
              <Animated.View style={{flex: 1, flexDirection: 'row'}}>
                <Animated.View
                  style={{
                    // position: 'absolute',
                    top: 20,
                    bottom: 20,
                    zIndex: 1000,
                    left: 20,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.add({...item, type: type})}
                    style={{borderRadius: 1}}>
                    <Text
                      style={{
                        borderWidth: 1,
                        borderColor: '#0B3142',
                        color: '#0B3142',
                        fontSize: 25,
                        fontWeight: 800,
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: '#FDB327',
                      }}>
                      Add one
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{
                    // position: 'absolute',
                    top: 20,
                    bottom: 20,
                    zIndex: 1000,
                    right: 20,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.remove({...item, type: type})}>
                    <Text
                      style={{
                        borderWidth: 1,
                        borderColor: '#0B3142',
                        color: '#0B3142',
                        fontSize: 25,
                        fontWeight: 800,
                        padding: 10,
                        alignSelf: 'center',
                        borderRadius: 5,
                        backgroundColor: '#FDB327',
                      }}>
                      Remove one
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    zIndex: 1000,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate('CreationPage', {
                        userId: userId,
                        selectedElements: this.state.selectedElements,
                        selectedBackground: this.state.selectedBackground,
                      })
                    }>
                    <Text
                      style={{
                        borderWidth: 1,
                        borderColor: '#0B3142',
                        color: '#0B3142',
                        fontSize: 25,
                        fontWeight: 800,
                        padding: 10,
                        width: 400,
                        textAlign: 'center',
                        borderRadius: 5,
                        backgroundColor: '#FDB327',
                      }}>
                      Back to creation page
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
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

              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: 20,
                  zIndex: 1000,
                  flex: 1,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigate('CreationPage', {
                      userId: userId,
                      selectedElements: this.state.selectedElements,
                      selectedBackground: this.state.selectedBackground,
                    })
                  }>
                  <Text
                    style={{
                      borderWidth: 1,
                      borderColor: '#0B3142',
                      color: '#0B3142',
                      fontSize: 25,
                      fontWeight: 800,
                      padding: 10,
                    }}>
                    Back to creation page
                  </Text>
                </TouchableOpacity>
              </Animated.View>
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
