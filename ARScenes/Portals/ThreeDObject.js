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
    this.getObjectData = this.getObjectData.bind(this)
  }

  getObjectData = async () =>{
    try {
      const { data } = await axios.get(`/api/elements/${this.props.elementId}`)
      console.log('<<<<<<<<data', data)
      this.setState({sourceViro3DObject:data.sourceViro3DObject})
    } catch (err) {
      console.log(err)
    }
  }

componentDidMount(){
  this.getObjectData()
}

  _handleClick() {
    this.setState({
      visibility: false,
    });
    Vibration.vibrate(1, false);
  }

  render() {
    // console.log('this.state.sourceViro3DObject', sourceViro3DObject)
    // const sourceViro3DObject = this.state.sourceViro3DObject?
    //       require (this.state.sourceViro3DObject):
    //       require('https://www.publicdomainpictures.net/pictures/50000/nahled/simple-red-heart.jpg')
    console.log('<<<<<this is a test!!!>>>>>>')
    return (
      <Viro3DObject
      
        //source from a hosted file
        source={images.hosted.uri}
        scale={[ 1, 1, 1]}
        position={[ 0, 0, -1]}
        type="GLB"

        // sources from a local file
        // source={images.local.uri}
        // resources = {[resourceViro3DObject1,resourceViro3DObject2]}
        // animation= {this.state.animation}
        // position={this.props.position}
        // scale={this.state.scale}
        // onClick={this._handleClick}
        // visible={this.state.visibility}
        // type="VRX"

        //We are testing out mapping over the resource. Currently it is hard coded
        // resources={resourceViro3DObject.map(resource =>  require(resource))

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

