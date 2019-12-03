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

// class method to get all the names of portals in the table
Portal.getAllNames = function() {
  const allPortals = this.findAll();
  return allPortals.map(portal => portal.name);
};

module.exports = Portal;
