import React, { Component } from 'react';
import { Viro3DObject, ViroAnimations } from 'react-viro';
import { images } from '../../js/res/images'


export default class ThreeDObject extends Component {
  constructor(props) {
    super(props);
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
      scale: [.03, 0.3, 0.3]
    };

  }



  render() {
    console.log('props: ', this.props)
    return (
      <Viro3DObject
        source={{uri: images.element[this.props.element.name].uri}}
        type={this.props.element.type}
        scale={this.props.element.scale}
        animation= {this.state.animation}
        position={this.props.element.position}
        resources = {images.element[this.props.element.name].resources}

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

