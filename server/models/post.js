var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var Post = db.database.define(
  'post', 
  {
    id: { 
      type: Sequelize.INTEGER, 
      autoIncrement: true,
      primaryKey: true
    },
    username: { 
      type: Sequelize.TEXT, 
      allowNull: false, 
      references: 'user', 
      referencesKey: 'username' 
    },
    location_id: { 
      type: Sequelize.INTEGER, 
      allowNull: false 
    },
    timestamp: { 
      type: Sequelize.DATE, 
      allowNull: false
    },
    text: {
      type: Sequelize.TEXT, 
      allowNull: true 
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    },
    animals: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    },
    favorites:  {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true
    }
  }, 
  {
    freezeTableName: true,
    tableName: 'post_full'
  }
);

module.exports = Post; 
