const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Portal = db.define('portal', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  imageURL: {
    type: Sequelize.STRING
  }
});

module.exports = Portal;
