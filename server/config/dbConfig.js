const { Sequelize } = require('sequelize');

// Replace with your actual DB credentials
const sequelize = new Sequelize('student_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;