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
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123456' }),
    User.create({ email: 'murphy@email.com', password: '123456' }),
  ]);

  const elements = await Promise.all([
    Element.create({
      name: 'Heart',
      type: 'VRX',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/assets/emoji_heart/emoji_heart.vrx',
    }),
    Element.create({
      name: 'Fox',
      type: 'OBJ',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/low-poly-fox-by-pixelmannen.obj',
    }),
  ]);

  const backgrounds = await Promise.all([
    Background.create({
      name: 'Beach',
      type: 'Viro360Image',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/guadalupe_360.jpg',
      loop: false,
    }),
    Background.create({
      name: 'Party',
      type: 'Viro360Video',
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit//master/js/res/Kaleidoscope.mp4',
      loop: true,
    }),
  ]);

  const portals = await Promise.all([
    Portal.create({
      name: 'PartyEvent',
      backgroundId: 2,
      type: 'custom',
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/portal.png',
    }),
    Portal.create({
      name: 'BeachVacation',
      backgroundId: 1,
      type: 'custom',
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/portal.png',
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
    Portel.create({
      elementId: 1,
      portalId: 1,
    }),
    Portel.create({
      elementId: 1,
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
    ElementProp.create({
      elementId: 1,
      portalId: 1,
      position: [2, 2, -3],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 1,
      portalId: 1,
      position: [1, 1.5, -5],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 1,
      portalId: 1,
      position: [-1, 1, -4],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 1,
      portalId: 2,
      position: [2, 2, -3],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 1,
      portalId: 2,
      position: [1, 1.5, -5],
      scale: [0.01, 0.01, 0.01],
    }),
    ElementProp.create({
      elementId: 1,
      portalId: 2,
      position: [-1, 1, -4],
      scale: [0.01, 0.01, 0.01],
    }),
  ]);

  const elementres = await Promise.all([
    ElementRes.create({
      elementId: 2,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/low-poly-fox-by-pixelmannen.mtl',
    }),
    ElementRes.create({
      elementId: 2,
      uri:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/texture.png',
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
