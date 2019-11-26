const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const ElementRes = db.define('elementres', {
  uri: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = ElementRes;
