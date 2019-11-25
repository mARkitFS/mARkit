const images = {
  background: {
    beach: {
      uri: 'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/guadalupe_360.jpg'
    },
    party: {
      uri: 'https://raw.githubusercontent.com/mARkitFS/mARkit//master/js/res/Kaleidoscope.mp4'
    }
  },
  element:{
    coolGuy:{
      uri: 'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/RUST_3d_Low1.obj'
    },
    fox:{
      uri: 'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/low-poly-fox-by-pixelmannen.obj',
      resources: [
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/low-poly-fox-by-pixelmannen.mtl',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/texture.png'
      ]
    },
    hosted: {
    uri: 'https://raw.githubusercontent.com/mARkitFS/mARkit/master/assets/emoji_heart/1180601.glb'

    },
    local: {
    uri: require('../../assets/emoji_heart/emoji_heart.vrx')
    }
}
}

export { images };
