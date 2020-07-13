const sequelize = require('../database/database')
const Sequelize = require('sequelize')

var immortal = sequelize.define(
  'immortal',
  {
    id: {
      type: Sequelize.STRING(3),
      primaryKey: true
    },
    name: Sequelize.STRING(255),
    position: Sequelize.DOUBLE(2),
    myth: Sequelize.DOUBLE(1),
    description: Sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

module.exports = immortal

