const sequelize = require('../database/database')
const Sequelize = require('sequelize')

var shining = sequelize.define(
  'statistics',
  {
    id: {
      type: Sequelize.STRING(3),
      primaryKey: true
    },
    userId: Sequelize.DOUBLE(2),
    number: Sequelize.DOUBLE(2),
    immortals: Sequelize.STRING(255),
    twotwo: Sequelize.STRING(255),
    time: Sequelize.STRING(255),
    store: Sequelize.DOUBLE(2),
    souls: Sequelize.DOUBLE(2),
    createdAt: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

module.exports = shining