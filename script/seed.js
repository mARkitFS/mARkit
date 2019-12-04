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
      id: 6,
      name: 'space',
      type: 'Viro360Image',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_space.jpg',
      loop: false,
      userId: 2,
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/backgrounds/ps_space.jpg',
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
