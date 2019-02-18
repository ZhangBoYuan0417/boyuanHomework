const user = require('../models/user.js');
const common = require('./common');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUserInfo = async function(ctx) {
  const req = ctx.request
  const id = req.header.id; 
  const result = await user.getUserById(id);
  ctx.body = common.reqBody(0, '', result.dataValues);
}

const login = async function(ctx) {
  const req = ctx.request.body;
  console.log(req.name)
  const userInfo = await user.getUserByName(req.name);
  console.log(!userInfo)
  if (userInfo) {
    if (bcrypt.compareSync(req.password, userInfo.password)) {
      const userToken = {
        name: userInfo.name,
        id: userInfo.id
      };
      const secret = 'boyuanhomework';
      const token = jwt.sign(userToken, secret);
      ctx.body = common.reqBody(0, '', {token})
    } else {
      ctx.body = common.reqBody(2, `password error or username error`, null)
    }
  } else {
    ctx.body = common.reqBody(2, `can't find user: ${req.name} in db`, null)
  }
}

const logup = async function(ctx) {
  try {
    const req = ctx.request.body;
    req.password = bcrypt.hashSync(req.password, 10)
    // ctx.body = req
    const res = await user.creatNewUser(req)
    if (res.code === 0) {
      ctx.body = common.reqBody(0, '', {req})
    } else {
      ctx.body = common.reqBody(1, res.text, {})
    }
  } catch(err){
    ctx.body = common.reqBody(2, `${err}`, {err})
  }
}


const getUserInfoTest = async function(ctx) {
  ctx.body = {
    id: '1',
    name: 'boyuan',
    password: '123'
  }
}

module.exports = {
  getUserInfo,
  getUserInfoTest,
  login,
  logup
}
// cd server
// sequelize-auto -o "./schema" -d homework -h 127.0.0.1 -u root -p 3306 -x 123456  -e mysql