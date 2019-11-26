const User = require('./user');
const Portal = require('./portal');
const Portel = require('./portEl');
const Element = require('./element');
const ElementProp = require('./elementProp');
const ElementRes = require('./elementRes');
const Background = require('./background');

//Associations
Background.hasMany(Portal)
Portal.belongsTo(Background)

Element.hasMany(ElementProp)
ElementProp.belongsTo(Element)

Element.belongsToMany(Portal,{as:'portalId', through: Portel})
Portal.belongsToMany(Element,{as:'elementId', through: Portel})

ElementProp.belongsTo(Portel)
Portel.hasMany(ElementProp)

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
  Background,
  Portel
};


