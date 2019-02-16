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
  login
}
// cd server
// sequelize-auto -o "./schema" -d homework -h 127.0.0.1 -u root -p 3306 -x 123456  -e mysql