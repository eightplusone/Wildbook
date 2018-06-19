var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var Animal = db.database.define(
  'animal', 
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
    species: { 
      type: Sequelize.TEXT, 
      allowNull: false 
    },
    locations: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    },
    posts: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true
    }
  },
  {
    tableName: 'animal_full',
    freezeTableName: true
  }
);

module.exports = Animal;
