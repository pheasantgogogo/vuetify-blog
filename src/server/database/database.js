const Sequelize = require('sequelize')

const config = {
  database: 'my_test', // 使用哪个数据库
  username: 'root', // 用户名
  password: '!Ww19931105', // 口令
  host: 'localhost', // 主机名
  port: 3306 // 端口号，MySQL默认3306
}
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
)

module.exports = sequelize