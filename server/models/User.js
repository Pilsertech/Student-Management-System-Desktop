const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

// Sequelize User model definition
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uname: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fname: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  photo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  gender: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pass: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  permit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  theme: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

module.exports = User;