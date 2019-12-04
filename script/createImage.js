const fs = require('fs');
const axios = require('axios');
const colors = require('colors');

(async () => {
  const portalId = 1;
  const element = await axios.get(
<<<<<<< HEAD
    `http://10.1.85.88:8080/api/elements/format/${portalId}`
  );

  const background = await axios.get(
    `http://10.1.85.88:8080/api/backgrounds`
  );
=======
    `http://10.1.85.88:8080/api/elements/format/${portalId}`,
  );

  const background = await axios.get(`http://10.1.85.88:8080/api/backgrounds`);
>>>>>>> 146c2328d9f4362f9d5d2b526e8a9df6dbd06db1

  const portal = await axios.get(`http://10.1.85.88:8080/api/portals`);

  let backgroundFormat = `background: { \n`;
  background.data.forEach(bg => {
    backgroundFormat += `         ${bg.name}: {
                uri: '${bg.uri}'
            }, \n`;
  });

  let elementFormat = `element: { \n`;
  element.data.forEach(el => {
    elementFormat += `       ${el.name}: {
              uri: '${el.uri}',
              resources: [${el.elementres.map(elres => `'${elres.uri}'\n`)} ]
          }, \n`;
  });

  let thumbnailFormat = `thumbnails: { \n`;
  portal.data.forEach(pt => {
    thumbnailFormat += `       ${pt.name}: {
              uri: '${pt.imageURL}'
          }, \n`;
  });

  const ex = `{\n
        ${backgroundFormat}  },\n
        ${elementFormat} },\n
        ${thumbnailFormat} }
      \n}`;

  const res = 'const images =  ' + ex + '\n export { images } ';
  fs.writeFileSync('./js/res/images.js', res);
})();
console.log('image script run successfully!'.green);
