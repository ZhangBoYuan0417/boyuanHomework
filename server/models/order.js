// models/order.js
// orderTpye: 0=>待抢；1=>已抢，尚未领到； 2=>已领到，送件中； 3=>已送达，订单完成
const db = require('../config/db.js'), 
      orderModel = '../schema/orderinfo.js';
const HomeworkDb = db.HomeworkDb;

const Order = HomeworkDb.import(orderModel); 

const createNewOrder = async function(params) {
  try {
    await Order.create({
      sendTime: params.sendTime,
      sendId: params.user,
      orderType: 0,
      money: params.money,
      from: params.from,
      to: params.to,
      boxType: params.boxType.join(',')
    })
    return {
      code: 0,
      text: ''
    }
  } catch(error) {
    return {
      code: 1,
      text: `db error: ${error}`
    }
  }
}

const findAllOrder = async function(params) {
  try {
    const orderArr = await Order.findAll(params)
    return {code:0, orderArr}
  } catch(error) {
    return {
      code: 1,
      text: `db error: ${error}`
    }
  }
}

const updataOrderDB = async function(set, where) {
  try {
    console.log('set', set)
    console.log('where', where)
    await Order.update(set,{'where': where})
    return {code: 0}
  } catch(error) {
    return {
      code: 1,
      text: `db error: ${error}`
    }
  }
}

module.exports = {
  createNewOrder, // 发单
  findAllOrder, // 查询order表
  updataOrderDB, // 更新order表
}