const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Portal = db.define('portal', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  resourceViro3DObject: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  animation: {
    type: Sequelize.JSON
  },
  scale: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  sourceViro3DObject: {
    type: Sequelize.STRING
  },
  sourceViro3DObject: {
    type: Sequelize.STRING
  },

});

module.exports = Portal;
