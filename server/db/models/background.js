const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Background = db.define('background', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  uri: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  loop: {
    type: Sequelize.BOOLEAN
  },
  imageURL: {
    type: Sequelize.STRING
  }
});

module.exports = Background
