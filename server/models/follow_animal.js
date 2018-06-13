var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var FollowAnimal = db.database.define(
  'follow_animal', 
  {
    username: { 
      type: Sequelize.TEXT, 
      primariKey: true,
      references: 'user', 
      referencesKey: 'username' 
    },
    animal_id: { 
      type: Sequelize.TEXT, 
      primariKey: true,
      references: 'animal', 
      referencesKey: 'id' 
    }
  }, 
  {
    freezeTableName: true,
    tableName: 'follow_animal'
  }
);

// Sequelize automatically generates attribute 'id' which is not needed
FollowAnimal.removeAttribute('id');

module.exports = FollowAnimal; 
