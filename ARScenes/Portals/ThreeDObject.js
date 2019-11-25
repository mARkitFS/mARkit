import React, { Component } from 'react';
import { Vibration } from 'react-native';
import { Viro3DObject, ViroAnimations } from 'react-viro';
import axios from 'axios'
import { images } from '../../js/res/images'


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
    this._handleClick = this._handleClick.bind(this);
    // this.getObjectData = this.getObjectData.bind(this)
  }

  // getObjectData = async () =>{
  //   try {
  //     const { data } = await axios.get(`/api/elements/${this.props.elementId}`)
  //     console.log('<<<<<<<<data', data)
  //     this.setState({sourceViro3DObject:data.sourceViro3DObject})
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

// componentDidMount(){
//   this.getObjectData()
// }

  _handleClick() {
    this.setState({
      visibility: false,
    });
    Vibration.vibrate(1, false);
  }

  render() {
    return (
      <Viro3DObject

        //source from a hosted file
        source={{uri: images.element[this.props.element[0].name].uri}}
        type={this.props.element[0].type}
        scale={this.props.element[0].scale}
        // position={[ 0, 0, -1]}


        // sources from a local file
        // source={images.local.uri}
        // animation= {this.state.animation}
        position={this.props.position}
        // scale={this.state.scale}
        // onClick={this._handleClick}
        // visible={this.state.visibility}
        // type="VRX"

        //We are testing out mapping over the resource. Currently it is hard coded
        // resources={resourceViro3DObject.map(resource =>  require(resource))
        resources = {images.element[this.props.element[0].name].resources}

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

