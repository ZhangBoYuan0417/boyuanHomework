// models/order.js
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

module.exports = {
  createNewOrder, // 发单
}