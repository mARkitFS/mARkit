/* eslint-disable camelcase */
const images = {
  background: {
    beach: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/guadalupe_360.jpg',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/guadalupe_360.jpg',
    },
    party: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/Kaleidoscope.mp4',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg',
    },
    theater: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/theater.jpg',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/theater-thumbnail.jpg',
    },
    space: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_space.jpg',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_space.jpg',
    },
  },
  element: {
    fox: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/fox/low-poly-fox-by-pixelmannen.obj',
      resources: [
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/fox/low-poly-fox-by-pixelmannen.mtl',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/fox/texture.png',
      ],
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/fox/fox.jpeg',
    },

    alduin: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin-dragon.obj',
      resources: [
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin-dragon.mtl',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin_n.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduineyes.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduineyes_g.jpg',
      ],
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin_thumbnail.jpg',
    },
    mario: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/mario/mario-sculpture.obj',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/mario/mariothumbnail.jpeg',
      resources: [
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduineyes_g.jpg',
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/mario/marioD.jpg',
      ],
    },
    beach_vacation: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/guadalupe_360.jpg',
      url:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/guadalupe_360.jpg',
    },
  },

  // creating a portal thumbnails property. The dashboard components pull in portals, not backgrounds. To get those components to display thumbnails from the existing thumbnail prop (which I've renamed from thumbnails to backgroundThumbnails) we would have to make another AJAX request and get the whole background object - just to get the name and use it to import a thumbnail image from this file. I also thought people might want to use a thumbnail per portal that's different to the one their portal background uses. So I separated backgroundThumbnails (used in portal creation) from portalThumbnails (used in components that display existing portals).

  backgroundThumbnails: {
    beach: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/guadalupe_360.jpg',
    },
    party: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg',
    },
    theater: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/theater-thumbnail.jpg',
    },
    space: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_space.jpg',
    },
    tiles: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_tiles.jpg',
    },
    waikiki: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_waikiki.jpg',
    },
    westlake: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_westlake.jpg',
    },
    default: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg',
    },
  },

  portalThumbnails: {
    beach_vacation: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/guadalupe_360.jpg',
    },
    party_event: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg',
    },
    default: {
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/defaults/portal-2-aperture-laboratories-video-game-clip-art-portal.jpg',
    },
  },
};

export {images};
