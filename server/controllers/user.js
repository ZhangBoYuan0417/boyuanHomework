// controllers/user.js 

const user = require('../models/user.js');

const getUserInfo = async function (ctx){
//   console.log('ctx.params',ctx.params)
//   console.log('ctx.data',ctx.data)
//   console.log('----------------------')
//   console.log('ctx.data',ctx)
//   console.log('----------------------')
  const req = ctx.request
  const id = req.header.id; // 获取url里传过来的参数里的id
  const result = await user.getUserById(id);  // 通过yield “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
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
    getUserInfoTest
}
// cd server
// sequelize-auto -o "./schema" -d homework -h 127.0.0.1 -u root -p 3306 -x 123456  -e mysql