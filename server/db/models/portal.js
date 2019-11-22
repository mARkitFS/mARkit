const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Portal = db.define('portal', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  tag: {
    type: Sequelize.STRING
  }
});

module.exports = Portal;
