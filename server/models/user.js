var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var User = db.database.define(
  'user', 
  {
    username: { 
      type: Sequelize.TEXT, 
      primariKey: true 
    },
    password: { 
      type: Sequelize.TEXT, 
      allowNull: false 
    },
    fname: { 
      type: Sequelize.TEXT, 
      allowNull: false 
    },
    lname: { 
      type: Sequelize.TEXT, 
      allowNull: false
    },
    posts: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    },
    followers:  {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    },
    following_users: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    },
    following_animals: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    },
    favorites: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    },
    locations: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    }
  }, 
  {
    freezeTableName: true,
    tableName: 'user_full'
  }
);

// Sequelize automatically generates attribute 'id' which is not needed
User.removeAttribute('id');

module.exports = User; 
