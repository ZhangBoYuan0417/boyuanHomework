// models/order.js
// orderTpye: 0=>待抢；1=>已抢，尚未领到； 2=>已领到，送件中； 3=>已送达，订单完成
const db = require('../config/db.js'), 
      orderModel = '../schema/orderinfo.js';
const HomeworkDb = db.HomeworkDb;

const Order = HomeworkDb.import(orderModel); 

const createNewOrder = async function(params) {
  try {
    await Order.create({
      sendTime: new Date().getTime(),
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

const getAll0Order = async function() {
  try {
    const orderArr = await Order.findAll({
      orderType: 0
    })
    return {code:0, orderArr}
  } catch(error) {
    return {
      code: 1,
      text: `db error: ${error}`
    }
  }
}

module.exports = {
  createNewOrder, // 发单
  getAll0Order, // 获取所有未领取订单
}