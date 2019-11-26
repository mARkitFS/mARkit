const User = require('./user');
const Portal = require('./portal');
const Element = require('./element');
const ElementProp = require('./elementProp');
const ElementRes = require('./elementRes');
const Background = require('./background');

//Associations
Background.hasMany(Portal)
Portal.belongsTo(Background)

Element.belongsToMany(Portal,{through: ElementProp})
Portal.belongsToMany(Element,{through: ElementProp})

Element.hasMany(ElementRes)
ElementRes.belongsTo(Element)

User.hasMany(Portal)
Portal.belongsTo(User)

User.hasMany(Element)
Element.belongsTo(User)

User.hasMany(Background)
Background.belongsTo(User)

//Export all models
module.exports = {
  User,
  Portal,
  Element,
  ElementProp,
  ElementRes,
  Background
};


