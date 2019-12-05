'use strict';

const db = require('../server/db');
const {
  User,
  Element,
  Background,
  ElementProp,
  ElementRes,
  Portal,
  Portel,
} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      id: 1,
      name: 'admin',
      email: 'admin@email.com',
      password: '123456',
    }),
    User.create({
      id: 2,
      name: 'cody',
      email: 'cody@email.com',
      password: '123456',
    }),
    User.create({
      id: 3,
      name: 'murphy',
      email: 'murphy@email.com',
      password: '123456',
    }),
  ]);

  const elements = await Promise.all([
    Element.create({
      id: 2,
      name: 'fox',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/fox/low-poly-fox-by-pixelmannen.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/fox/fox.jpeg',
    }),
    Element.create({
      id: 3,
      name: 'alduin',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin-dragon.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin_thumbnail.jpg',
    }),
    Element.create({
      id: 4,
      name: 'mario',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/mario/mario-sculpture.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/mario/mariothumbnail.jpeg',
    }),
    Element.create({
      id: 5,
      name: 'spiderman',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/spiderman/spiderman-scene.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/spiderman/spiderman-thumbnail.jpeg',
    }),
    Element.create({
      id: 6,
      name: 'coffeeTable',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/coffee-table/wooden-coffe-table.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/coffee-table/coffee-table-thumbnail.jpg',
    }),
    Element.create({
      id: 7,
      name: 'ballChair',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/ball-chair.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/ball-chair-thumbnail.jpg',
    }),
    Element.create({
      id: 8,
      name: 'sofa',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/sofa/sofa.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/sofa/sofa-thumbnail.jpg',
    }),
    Element.create({
      id: 9,
      name: 'playingCard',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/playing-card/ace-of-diamonds-playing-card.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/playing-card/playing-card-thumbnail.jpg',
    }),
    Element.create({
      id: 10,
      name: 'alice',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alice/alice-madness-returns.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alice/aliceThumbnail.png',
    }),
    Element.create({
      id: 11,
      name: 'heart',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/heart/heart.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/heart/heartThumbnail.jpg',
    }),
    Element.create({
      id: 12,
      name: 'goku',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/goku.obj',
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/GokuThumbnail.jpg',
    }),
  ]);

  const backgrounds = await Promise.all([
    Background.create({
      id: 2,
      name: 'beach',
      type: 'Viro360Image',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/guadalupe_360.jpg',
      loop: false,
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/guadalupe_360.jpg',
    }),
    Background.create({
      id: 1,
      name: 'party',
      type: 'Viro360Video',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit//master/graphics/backgrounds/Kaleidoscope.mp4',
      loop: true,
      userId: 1,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg',
    }),
    Background.create({
      id: 3,
      name: 'theater',
      type: 'Viro360Image',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/theater.jpg',
      loop: false,
      userId: 2,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/theater-thumbnail.jpg',
    }),
     Background.create({
      id: 4,
      name: 'space',
      type: 'Viro360Image',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_space.jpg',
      loop: false,
      userId: 2,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_space.jpg',
    }),
    Background.create({
      id: 5,
      name: 'comicon',
      type: 'Viro360Image',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/comicon%20360%20image.jpg',
      loop: false,
      userId: 2,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/comicon%20360%20image.jpg',
    }),
    Background.create({
      id: 6,
      name: 'interior',
      type: 'Viro360Image',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/interior%20360%20image.jpg',
      loop: false,
      userId: 2,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/interior%20360%20image.jpg',
    }),
    Background.create({
      id: 7,
      name: 'cheshire',
      type: 'Viro360Video',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/chesh.mp4',
      loop: true,
      userId: 2,
      imageURL:
        '',
    }),
    Background.create({
      id: 8,
      name: 'alps',
      type: 'Viro360Video',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/alps.mp4',
      loop: true,
      userId: 2,
      imageURL:
        '',
    }),
  ]);

  const portals = await Promise.all([
    Portal.create({
      name: 'party_event',
      backgroundId: 1,
      type: 'custom',
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/abstract-kaleidoscope-background-beautiful-multicolor-260nw-1084042973.jpg',
      userId: 1,
    }),
    Portal.create({
      name: 'beach_vacation',
      backgroundId: 2,
      type: 'custom',
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/guadalupe_360.jpg',
      userId: 2,
    }),
  ]);

  const portels = await Promise.all([
    Portel.create({
      elementId: 2,
      portalId: 1,
    }),
    Portel.create({
      elementId: 2,
      portalId: 2,
    }),
  ]);

  const elementprops = await Promise.all([
    ElementProp.create({
      elementId: 2,
      portalId: 1,
      position: [2, 2, -3],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 2,
      portalId: 1,
      position: [1, 1.5, -5],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 2,
      portalId: 1,
      position: [-1, 1, -4],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 2,
      portalId: 2,
      position: [2, 2, -3],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 2,
      portalId: 2,
      position: [1, 1.5, -5],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 2,
      portalId: 2,
      position: [-1, 1, -4],
      scale: [0.01, 0.01, 0.01],
    }),
  ]);

  const elementres = await Promise.all([
    ElementRes.create({
      elementId: 2,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/fox/low-poly-fox-by-pixelmannen.mtl',
    }),
    ElementRes.create({
      elementId: 2,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/fox/texture.png',
    }),
    ElementRes.create({
      elementId: 3,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin-dragon.mtl',
    }),
    ElementRes.create({
      elementId: 3,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin.jpg',
    }),
    ElementRes.create({
      elementId: 3,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduin_n.jpg',
    }),
    ElementRes.create({
      elementId: 3,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduineyes.jpg',
    }),
    ElementRes.create({
      elementId: 3,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alduin/alduineyes_g.jpg',
    }),
    ElementRes.create({
      elementId: 4,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/mario/mario-sculpture.mtl',
    }),
    ElementRes.create({
      elementId: 4,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/mario/marioD.jpg',
    }),
    ElementRes.create({
      elementId: 5,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/spiderman/spiderman-scene.mtl',
    }),
    ElementRes.create({
      elementId: 5,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/spiderman/spiderman.dff.png',
    }),
    ElementRes.create({
      elementId: 5,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/spiderman/spiderman.norm.png',
    }),
    ElementRes.create({
      elementId: 5,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/spiderman/spiderman.spec.png',
    }),
    ElementRes.create({
      elementId: 6,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/coffee-table/922f145fcca2d4dd87186af3a90c8d3a.jpg',
    }),
    ElementRes.create({
      elementId: 6,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/coffee-table/Null.1Surface_Color.jpg',
    }),
    ElementRes.create({
      elementId: 6,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/coffee-table/wooden-coffe-table.mtl',
    }),
    ElementRes.create({
      elementId: 7,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/ball-chair.mtl',
    }),
    ElementRes.create({
      elementId: 7,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/padding_bump.jpg',
    }),
    ElementRes.create({
      elementId: 7,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/padding_color.jpg',
    }),
    ElementRes.create({
      elementId: 7,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/padding_specular.jpg',
    }),
    ElementRes.create({
      elementId: 7,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/pillows_bump.jpg',
    }),
    ElementRes.create({
      elementId: 7,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/pillows_color.jpg',
    }),
    ElementRes.create({
      elementId: 7,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/shell_color.jpg',
    }),
    ElementRes.create({
      elementId: 7,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/ball-chair/trim_color.jpg',
    }),
    ElementRes.create({
      elementId: 8,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/sofa/sofa.mtl',
    }),
    ElementRes.create({
      elementId: 9,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/playing-card/Ace.gif',
    }),
    ElementRes.create({
      elementId: 9,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/playing-card/GrungeAce.gif',
    }),
    ElementRes.create({
      elementId: 9,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/playing-card/ace-of-diamonds-playing-card.mtl',
    }),
    ElementRes.create({
      elementId: 10,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alice/Alice_DM.tga',
    }),
    ElementRes.create({
      elementId: 10,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alice/Alice_DM2.tga',
    }),
    ElementRes.create({
      elementId: 10,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alice/alice-madness-returns.mtl',
    }),
    ElementRes.create({
      elementId: 10,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/alice/eye.tga',
    }),
    ElementRes.create({
      elementId: 11,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/heart/heart.mtl',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/goku.mtl',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_31.png',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_30.png',
    }), 
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_29.png'
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_28.png',
    }), ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_27.png',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_26.png',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_25.png',
    }), ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_24.png',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_23.png',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_22.png',
    }), ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_21.png',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_20.png',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_19.png',
    }),
    ElementRes.create({
      elementId: 12,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/elements/goku/Dolphin.exe_Tue_Mar_22_01-00-09_2011_18.png',
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${elements.length} elements`);
  console.log(`seeded ${backgrounds.length} backgrounds`);
  console.log(`seeded ${elementprops.length} elementprops`);
  console.log(`seeded ${elementres.length} elementres`);
  console.log(`seeded ${portals.length} portals`);
  console.log(`seeded ${portels.length} portels`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
