import React, { Component } from 'react';
import { Vibration } from 'react-native';
import { Viro3DObject, ViroAnimations } from 'react-viro';
const sourceViro3DObject = '../../assets/emoji_heart/emoji_heart.vrx'
let resourceViro3DObject = ['../../assets/emoji_heart/emoji_heart_specular.png',
'../../assets/emoji_heart/emoji_heart.png']
const resourceViro3DObject1 = '../../assets/emoji_heart/emoji_heart_specular.png'
const resourceViro3DObject2 = '../../assets/emoji_heart/emoji_heart.png'
const animation = {
  name: 'bounceUpAndDownAndRotate',
  run: true,
  loop: true
}
const scale = [0.3, 0.3, 0.3]
let resourceArr = []
//Figure out how to map over multiple resources. Currently hard coding it.
// resourceViro3DObject.forEach((resource) => resourceArr.push(require(resource)))

export default class ThreeDObject extends Component {
  constructor() {
    super();
    this.state = {
      visibility: true,
      sourceViro3DObject: '../../assets/emoji_heart/emoji_heart.vrx',
      resourceViro3DObject:['../../assets/emoji_heart/emoji_heart_specular.png',
      '../../assets/emoji_heart/emoji_heart.png'],
      animation: {
        name: 'bounceUpAndDownAndRotate',
        run: true,
        loop: true
      },
      scale: [0.3, 0.3, 0.3]
    };
    this._handleClick = this._handleClick.bind(this);
  }



  _handleClick() {
    this.setState({
      visibility: false,
    });
    Vibration.vibrate(1, false);
  }

  render() {
    console.log('this.state.sourceViro3DObject', sourceViro3DObject)
    return (
      <Viro3DObject
        source={require (sourceViro3DObject)}
        //We are testing out mapping over the resource. Currently it is hard coded
        // resources={resourceViro3DObject.map(resource =>  require(resource))}
        resources = {[resourceViro3DObject1,resourceViro3DObject2]}
        animation= {animation}
        position={this.props.position}
        scale={scale}
        onClick={this._handleClick}
        visible={this.state.visibility}
        type="VRX"
      />
    );
  }
}


ViroAnimations.registerAnimations({

  rotate: {
    properties: {
      rotateY: '+=90'
    },
    duration: 1000, // 250 .25 seconds
  },

  bounceUp: {
    properties: {
      positionY: '+=0.5',
    },
    easing: 'Bounce',
    duration: 500
  },

  bounceDown: {
    properties: {
      positionY: '-=0.5',
    },
    easing: 'Bounce',
    duration: 500
  },

  bounceUpAndDownAndRotate: [
      ['bounceUp', 'bounceDown', 'rotate']
  ],
});

