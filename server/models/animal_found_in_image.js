var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var AnimalFoundInImage = db.database.define(
  'animal_found_in_image', 
  {
    image_id: { 
      type: Sequelize.INTEGER,
      allowNull: false, 
      primariKey: true,
      references: 'image', 
      referencesKey: 'id' 
    },
    animal_id: {
      type: Sequelize.INTEGER,
      primariKey: true,
      references: 'animal',
      referencesKey: 'id'
    }
  }, 
  {
    freezeTableName: true,
    tableName: 'animal_found_in_image'
  }
);

// Sequelize automatically generates attribute 'id' which is not needed
AnimalFoundInImage.removeAttribute('id');

module.exports = AnimalFoundInImage; 
