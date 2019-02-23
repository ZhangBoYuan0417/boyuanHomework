const expressObj = {
  false:{name: '请选择快递公司'},
  zhongt:{name: '中通(学府第一营业部)'},
  shent:{name: '申通(祥园路店)'},
  shunfeng:{name: '顺丰(祥园路店)'},
  baishi:{name: '百世汇通(祥园路店)'},
  yuant:{name: '圆通(书苑街)'},
  yunda:{name: '韵达(学府公司)'},
  tt:{name: '天天快递南岗分部'},
}

const boxInfoArr =  [
  [{name: '请选择快递大小', value: 'false'}, {name: '小件(手机大小)', value: 's'}, {name: '中件(书包大小)', value: 'm'}, {name: '大件(大于书包)', value: 'l'}],
  [{name: '请选择快递是否易碎', value: 'false'}, {name: '易碎', value: 'careful'}, {name:'不易碎', value: 'nocareful'}]
]

const boxSize = {
  s: '小件',
  m: '中件',
  l: '大件'
}

module.exports = {
  expressObj, boxInfoArr, boxSize
}