const immortal = require('../init/immortal')
const item_position = require("../init/itemPosition")

let getItemList = async (ctx, next) => {
  let data = null
  await immortal.findAll().then(res => {
    data = JSON.parse(JSON.stringify(res))
  })
  await item_position.findAll().then(res => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (data[i].position === res[j].id) {
          data[i].color = res[j].color
          data[i].position_text = res[j].position
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

module.exports = { 'GET /getItemList': getItemList }