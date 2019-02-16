/**
 * code:
 * 0 => success
 * 1 => db error
 * 2 => data error
 * 
 */
const reqBody = function(code, msg, obj = {}) {
  let res = Object.assign({}, {data:obj}, {result:{code,msg}})
  return res
}

module.exports = {
  reqBody
}