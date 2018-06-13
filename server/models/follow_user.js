var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var FollowUser = db.database.define(
  'follow_user', 
  {
    follower_id: { 
      type: Sequelize.TEXT, 
      primariKey: true,
      references: 'user', 
      referencesKey: 'username' 
    },
    followee_id: { 
      type: Sequelize.TEXT, 
      primariKey: true,
      references: 'user', 
      referencesKey: 'username' 
    },
  }, 
  {
    freezeTableName: true,
    tableName: 'follow_user'
  }
);

// Sequelize automatically generates attribute 'id' which is not needed
FollowUser.removeAttribute('id');

module.exports = FollowUser; 
