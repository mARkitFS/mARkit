const fs = require('fs');
const axios = require('axios');
const colors = require('colors');

(async () => {
  const portalId = 1;
  const element = await axios.get(
    `http://10.1.85.96:8080/api/elements/format/${portalId}`
  );

  const background = await axios.get(

    `http://10.1.85.96:8080/api/backgrounds`
  );

  const portal = await axios.get(`http://10.1.85.96:8080/api/portals`);


  let defaultPortal = `default: {
    uri:
      'https://raw.githubusercontent.com/mARkitFS/mARkit/master/graphics/defaults/portal-2-aperture-laboratories-video-game-clip-art-portal.jpg'
  }`

  let backgroundFormat = `background: { \n`;
  background.data.forEach(bg => {
    backgroundFormat += `         ${bg.name}: {
                uri: '${bg.uri}',
                url: '${bg.imageURL}'
            }, \n`

  });

  let elementFormat = `element: { \n`;
  element.data.forEach(el => {
    elementFormat += `       ${el.name}: {
              uri: '${el.uri}',
              resources: [${el.elementres.map(elres => `'${elres.uri}'\n`)} ],
              url: '${el.imageURL}' \n
          }, \n`;
  });

  let thumbnailFormat = `portalThumbnails: { \n
    ${defaultPortal}, \n`;
  portal.data.forEach(pt => {
    thumbnailFormat += `       ${pt.name}: {
              uri: '${pt.imageURL}'
          }, \n
        `;
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
