const userName = require('../init/username')

let getUserList = async (ctx, next) => {
  await userName.findAll().then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true,
      data: res
    }
  })
}

let addUser = async (ctx, next) => {
  await userName.create({
    name: ctx.request.body.name
  }).then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true
    }
  })
}

module.exports = {
  'GET /getUserList': getUserList,
  'POST /addUser': addUser
}