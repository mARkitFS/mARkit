const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Element = db.define('element', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
  },
  uri: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Element;
