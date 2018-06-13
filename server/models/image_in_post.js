var Sequelize = require('sequelize');
var db = require(process.cwd() + '/db');

var ImageInPost = db.database.define(
  'image_in_post', 
  {
    image_id: { 
      type: Sequelize.INTEGER,
      allowNull: false, 
      primariKey: true,
      references: 'image', 
      referencesKey: 'id' 
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
    tableName: 'image_in_post'
  }
);

// Sequelize automatically generates attribute 'id' which is not needed
ImageInPost.removeAttribute('id');

module.exports = ImageInPost; 
