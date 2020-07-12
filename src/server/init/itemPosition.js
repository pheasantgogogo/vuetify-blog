const sequelize = require('../database/database')
const Sequelize = require('sequelize')

var item_position = sequelize.define(
  'item-position',
  {
    id: {
      type: Sequelize.STRING(3),
      primaryKey: true
    },
    position: Sequelize.STRING(255),
    color: Sequelize.STRING(2)
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

module.exports = item_position