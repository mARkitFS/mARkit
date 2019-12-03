/* eslint-disable camelcase */
const images = {
  background: {
    beach: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/guadalupe_360.jpg',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/guadalupe_360.jpg'
    },
    party: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit//master/js/res/Kaleidoscope.mp4',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg'
    },
    theater: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/theater.jpg',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/theater-thumbnail.jpg'
    },
    space: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/ps_space.jpg',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/ps_space.jpg'
    }
  },
  element: {
    fox: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/low-poly-fox-by-pixelmannen.obj',
      resources: [
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/low-poly-fox-by-pixelmannen.mtl',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/texture.png'
      ],
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/fox.jpeg'
    },
    heart: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/assets/emoji_heart/emoji_heart.vrx',
      resources: [
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/assets/emoji_heart/emoji_heart_specular.png',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/assets/emoji_heart/emoji_heart.png'
      ],
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/heart.png'
    },

    alduin: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/alduin-dragon.obj',
      resources: [
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/alduin-dragon.mtl',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/alduin.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/alduin_n.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/alduineyes.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/alduineyes_g.jpg'
      ],
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/Alduin_thumbnail.jpg'
    },
    shuttle: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter.obj',
      resources: [
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter.mtl',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-spstob_3.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-spstob_2.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-spstob_1.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-posz.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-posy.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-posx.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-negz.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-negy.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-negx.jpg'
      ],
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/space-shuttle-orbiter-thumbnail.jpg'
    }
  },

  // creating a portal thumbnails property. The dashboard components pull in portals, not backgrounds. To get those components to display thumbnails from the existing thumbnail prop (which I've renamed from thumbnails to backgroundThumbnails) we would have to make another AJAX request and get the whole background object - just to get the name and use it to import a thumbnail image from this file. I also thought people might want to use a thumbnail per portal that's different to the one their portal background uses. So I separated backgroundThumbnails (used in portal creation) from portalThumbnails (used in components that display existing portals).

  backgroundThumbnails: {
    beach: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/guadalupe_360.jpg'
    },
    party: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg'
    },
    theater: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/theater-thumbnail.jpg'
    },
    space: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/ps_space.jpg'
    },
    tiles: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/ps_tiles.jpg'
    },
    waikiki: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/ps_waikiki.jpg'
    },
    westlake: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/ps_westlake.jpg'
    },
    default: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg'
    }
  },

  portalThumbnails: {
    beach_vacation: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/guadalupe_360.jpg'
    },
    party_event: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg'
    },
    default: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/portal-2-aperture-laboratories-video-game-clip-art-portal.jpg'
    }
  }
};

export { images };
