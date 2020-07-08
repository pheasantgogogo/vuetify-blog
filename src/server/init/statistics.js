const sequelize = require('../database/database')

var Statistics = sequelize.define(
  'immortal',
  {
    id: {
      type: Sequelize.STRING(3),
      primaryKey: true
    },
    name: Sequelize.STRING(255),
    position: Sequelize.DOUBLE(2),
    myth: Sequelize.DOUBLE(1),
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

module.exports = Statistics

