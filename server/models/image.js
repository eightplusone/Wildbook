var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var Image = db.database.define(
  'image', 
  {
    id: { 
      type: Sequelize.INTEGER, 
      primaryKey: true 
    },
    url: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    timestamp: { 
      type: Sequelize.DATE, 
      allowNull: false
    },
    lat: { 
      type: Sequelize.INTEGER, 
      allowNull: false 
    },
    long: { 
      type: Sequelize.INTEGER, 
      allowNull: false 
    },
    username: { 
      type: Sequelize.TEXT, 
      allowNull: false, 
      references: 'user', 
      referencesKey: 'username' 
    },
    is_uploaded_to_ibeis: {
      type: Sequelize.BOOLEAN, 
      allowNull: false
    }
  }, 
  {
    freezeTableName: true,
    tableName: 'image'
  }
);

module.exports = Image; 
