// models/Session.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./Student');
const Dean = require('./Dean');

const Session = sequelize.define('Session', {
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  is_booked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Student.hasMany(Session);
Session.belongsTo(Student);

Dean.hasMany(Session);
Session.belongsTo(Dean);

module.exports = Session;
