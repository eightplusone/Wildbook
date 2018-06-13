var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var Comment = db.database.define(
  'comment', 
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
    },
    timestamp: { 
      type: Sequelize.DATE, 
      allowNull: false,
      primariKey: true 
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, 
  {
    freezeTableName: true,
    tableName: 'comment'
  }
);

// Sequelize automatically generates attribute 'id' which is not needed
Comment.removeAttribute('id');

module.exports = Comment; 
