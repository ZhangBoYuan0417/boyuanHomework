const order = require('../models/order.js')
const common = require('./common');

const sendOrder = async function(ctx) {
  const req = ctx.request.body;
  const result = await order.createNewOrder(req);
  if (result.code === 0) {
    ctx.body = common.reqBody(0, '')
  } else {
    ctx.body = common.reqBody(2, 'db error', result)
  }
}

const get0Orders = async function(ctx) {
  const result = await order.getAll0Order();
  if (result.code === 0) {
    ctx.body = common.reqBody(0, '', result.orderArr)
  } else {
    ctx.body = common.reqBody(2, 'db error')
  }
}

module.exports = {
  sendOrder,
  get0Orders
}