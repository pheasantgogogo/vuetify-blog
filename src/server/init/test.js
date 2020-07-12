const sequelize = require('../database/database')
const Sequelize = require('sequelize')

var Test = sequelize.define(
  'test_databases',
  {
    id: {
      type: Sequelize.STRING(11),
      primaryKey: true
    },
    name: Sequelize.STRING(255),
    weight: Sequelize.DOUBLE(255),
    height: Sequelize.DOUBLE(255),
    info: Sequelize.STRING(255),
    date: Sequelize.STRING(255)
  },
  {
    timestamps: false
  }
)

module.exports = Test