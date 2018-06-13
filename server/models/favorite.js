var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var Favorite = db.database.define(
  'favorite', 
  {
    username: { 
      type: Sequelize.TEXT, 
      allowNull: false, 
      primariKey: true,
      references: 'user', 
      referencesKey: 'username' 
    },
    post_id: {
      type: Sequelize.INTEGER,
      primariKey: true,
      references: 'post',
      referencesKey: 'id'
    }
  }, 
  {
    freezeTableName: true,
    tableName: 'favorite'
  }
);

// Sequelize automatically generates attribute 'id' which is not needed
Favorite.removeAttribute('id');

module.exports = Favorite; 
