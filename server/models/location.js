var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var Location = db.database.define(
  'location', 
  {
    id: { 
      type: Sequelize.INTEGER, 
      autoIncrement: true,
      primaryKey: true 
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    lat: { 
      type: Sequelize.INTEGER, 
      allowNull: false 
    },
    long: { 
      type: Sequelize.INTEGER, 
      allowNull: false 
    }
  }, 
  {
    freezeTableName: true,
    tableName: 'location'
  }
);

module.exports = Location; 
