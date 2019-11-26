const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Portel = db.define('portel', {
  elementId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  portalId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

module.exports = Portel
