const sequelize = require('../database/database')
const Sequelize = require('sequelize')

var User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.STRING(11),
      primaryKey: true
    },
    account: Sequelize.STRING(255),
    password: Sequelize.STRING(255)
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

module.exports = User