const Sequelize = require('sequelize')
const sequelize = require('../database/database')

var Blog = sequelize.define(
  'blog',
  {
    id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    content: Sequelize.STRING(65536),
    title: Sequelize.STRING(255),
    createAt: Sequelize.NUMBER(20),
    updateAt: Sequelize.NUMBER(20)
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

module.exports = Blog