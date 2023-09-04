// models/Dean.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dean = sequelize.define('Dean', {
  university_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  },
});

module.exports = Dean;
