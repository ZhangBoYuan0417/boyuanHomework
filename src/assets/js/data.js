const expressObj = {
  false:{name: '请选择快递公司'},
  hwl:{name: '汇文楼', location:[126.6221210000,45.7093450000]},
  zhongt:{name: '中通(学府第一营业部)', location: [126.6206190000,45.7102590000]},
  shent:{name: '申通(祥园路店)', location: [126.6223326585,45.7104854139]},
  shunfeng:{name: '顺丰(祥园路店)', location: [126.6223561764,45.7107831478]},
  baishi:{name: '百世汇通(祥园路店)', location: [126.6223078966,45.7111614793]},
  yuant:{name: '圆通(书苑街)', location: [126.6171919181,45.7113744411]},
  yunda:{name: '韵达(学府公司)', location: [126.6166350000,45.7113470000]},
  tt:{name: '天天快递南岗分部', location: [126.6169410000,45.7104370000]},
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