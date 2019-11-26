const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const ElementProp = db.define('elementprop', {
  elementId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  portalId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  position: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  scale: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  }
});

module.exports = ElementProp
