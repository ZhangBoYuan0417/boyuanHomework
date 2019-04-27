// models/user.js
const db = require('../config/db.js'), 
      userModel = '../schema/userinfo.js'; // 引入userInfo的表结构
const HomeworkDb = db.HomeworkDb; // 引入数据库

const User = HomeworkDb.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserById = async function(id) {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  });
  return userInfo // 返回数据
}

const getUserByName = async function(name) {
  const userInfo = await User.findOne({
    where: {
      name: name
    }
  });
  return userInfo // 返回数据
}

const creatNewUser = async function(params) {
  try {
    await User.create({
      name: params.name,
      password: params.password,
      phone: params.phone
    })
    return {
      code: 0,
      text: ''
    }
  }
  catch(error) {
    return {
      code: 1,
      text: `db error: ${error}`
    }
  }
}

module.exports = {
  getUserById,  // 查询用户
  getUserByName,
  creatNewUser,  // 创建用户
}