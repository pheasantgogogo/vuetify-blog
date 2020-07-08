const sequelize = require('../database/database')

var UserName = sequelize.define(
  'username',
  {
    id: {
      type: Sequelize.STRING(2),
      primaryKey: true
    },
    name: Sequelize.STRING(255)
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

module.exports = UserName