`use strict`
// import user from '../controllers/user'
// import koaRouter from 'koa-router'
const user = require('../controllers/user')
const order = require('../controllers/order')
const koaRouter = require('koa-router')

const router = koaRouter()

router.get('/userInfoTest', user.getUserInfoTest)
router.get('/userInfo', user.getUserInfo)
router.post('/login', user.login)

router.post('/sendOrder', order.sendOrder)

module.exports = router