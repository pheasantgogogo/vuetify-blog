const shining = require('../init/statistics')
const userName = require('../init/username')

let getShiningList = async (ctx, next) => {
  let data = null
  await shining.findAll({
    order: [['time', 'DESC']]
  }).then(res => {
    data = JSON.parse(JSON.stringify(res))
  })
  await userName.findAll().then(res => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (data[i].userId === res[j].id) {
          data[i].userName = res[j].name
        }
      }
    }
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true,
      data: data
    }
  })
}

let addShiningList = async (ctx, next) => {
  await shining.create({
    userId: ctx.request.body.userId,
    number: ctx.request.body.number,
    immortals: ctx.request.body.immortals,
    time: ctx.request.body.time,
    souls: ctx.request.body.souls,
    store: ctx.request.body.store,
    twotwo: ctx.request.body.twotwo,
    createdAt: new Date().getTime()
  }).then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true
    }
  })
}

let updateShining = async (ctx, next) => {
  await shining.findAll({
    where: {
      id: ctx.request.body.id
    }
  }).then(async res => {
    await res[0].update({
      userId: ctx.request.body.userId,
      number: ctx.request.body.number,
      souls: ctx.request.body.souls,
      store: ctx.request.body.store,
      immortals: ctx.request.body.immortals,
      twotwo: ctx.request.body.twotwo,
      time: ctx.request.body.time
    })
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true
    }
  })
}
module.exports = {
  'GET /getShiningList': getShiningList,
  'POST /addShiningList': addShiningList,
  'POST /updateShining': updateShining
}