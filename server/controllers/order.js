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

const getOrders = async function(ctx) {
  const req = ctx.request.body;
  const result = await order.findAllOrder(req.params);
  if (result.code === 0) {
    ctx.body = common.reqBody(0, '', result.orderArr)
  } else {
    ctx.body = common.reqBody(2, 'db error', result)
  }
}

const updateOrder = async function(ctx) {
  const req = ctx.request.body;
  // console.log(req)
  const result = await order.updataOrderDB(req.set, req.where);
  if (result.code === 0) {
    ctx.body = common.reqBody(0, '', 'ok')
  } else {
    ctx.body = common.reqBody(2, 'db error', result)
  }
}

module.exports = {
  sendOrder,
  getOrders,
  updateOrder
}