var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  'postgres://wildbookadmin:w!ldb0ok@wildbook.ccormlfrpqmz.us-east-1.rds.amazonaws.com:5432/wildbook', 
  {
    dialect: 'postgres',
    dialectOptions: { ssl: 'Amazon RDS' },
    define: {
      timestamps: false,
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database: ', err);
  });

module.exports.database = sequelize;
