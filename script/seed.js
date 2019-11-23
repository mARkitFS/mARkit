'use strict';

const db = require('../server/db');
const { User, Portal, Element } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123456' }),
    User.create({ email: 'murphy@email.com', password: '123456' })
  ]);

  const elements = await Promise.all([
    Element.create({
      name: 'Heart',
      description: 'The beating heart of our project' ,
      resourceViro3DObject: ['../../assets/emoji_heart/emoji_heart_specular.png',
      '../../assets/emoji_heart/emoji_heart.png'],
      animation: {
        name: 'bounceUpAndDownAndRotate',
        run: true,
        loop: true
      } ,
      scale: [0.3, 0.3, 0.3],
      sourceViro3DObject: '../../assets/emoji_heart/emoji_heart.vrx' }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${elements.length} elements`);
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
