var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var GroupPost = db.database.define(
  'group_post', 
  {
    post_id: { 
      type: Sequelize.INTEGER,
      allowNull: false, 
      primariKey: true,
      references: 'post', 
      referencesKey: 'id' 
    },
    username: {
      type: Sequelize.TEXT,
      primariKey: true,
      references: 'user',
      referencesKey: 'username'
    }
  }, 
  {
    freezeTableName: true,
    tableName: 'group_post'
  }
);

// Sequelize automatically generates attribute 'id' which is not needed
GroupPost.removeAttribute('id');

module.exports = GroupPost; 
