<template>
  <div class="sendpage-container">
    <group>
      <popup-picker :data="expressArr" title="从哪拿：" v-model="selected.fromMsg" @on-change='fromChanged'></popup-picker>
      <x-input title="送到哪：" v-model="selected.to" placeholder="请输入地址" placeholder-align="right"></x-input>
      <popup-picker :data="boxInfoArr" title="快递信息: " v-model="selected.boxTypeMsg" @on-change='boxTypeChanged'></popup-picker>
      <cell title="支付金额：" :inline-desc="selected.money+'元'" primary="content">
        <range v-model="selected.money" :min="10" :max="50" :step="5"></range>
      </cell>
      <x-button @click.native="sendOrder">提交订单</x-button>
    </group>
  </div>
</template>

<script>
import { XInput, PopupPicker, Group, Range, Cell, XButton } from 'vux';
import DATA from '../../assets/js/data.js'
export default {
  components:{
    XInput, PopupPicker, Group, Range, Cell, XButton
  },
  data() {
    let expressArr = [[]];
    Object.keys(DATA.expressObj).forEach((k) => {
      expressArr[0].push({name:DATA.expressObj[k].name, value: k})
    })
    return {
      selected: {
        from: '',
        fromMsg: ['请选择'],
        boxType: [''],
        boxTypeMsg: ['请选择'],
        to: '',
        money: 10
      },
      expressArr: expressArr,
      boxInfoArr: DATA.boxInfoArr
    }
  },
  methods: {
    sendOrder() {
      const res = this.orderFormat();
      if (res.msg) {
        this.$vux.toast.show({
          text: res.msg
        })
        return;
      } else {
        const _this = this
        this.$vux.confirm.show({
          title: '请确认订单',
          content: `<div style="text-align: left">
                      <p>快递公司：${_this.selected.fromMsg}</p>
                      <p>目的地：${_this.selected.to}</p>
                      <p>快递信息：${_this.selected.boxTypeMsg.join(';')}</p>
                      <p>金额：${_this.selected.money}元</p>
                    </div>`,
          confirmText: '确认完毕，发单！',
          cancelText: '我再看看！',
          onConfirm () {
            const params = Object.assign({}, res.params, {user:'boyuan'})
            _this.$http.post('/boyuan/sendOrder', params)
          }
        })

      }
    },
    fromChanged(value) {
      if (!this.arrFormTest(value)) return;
      this.selected.fromMsg = new Array(DATA.expressObj[value[0]].name)
      this.selected.from = value[0]
    },
    boxTypeChanged(value) {
      if (!this.arrFormTest(value)) return;
      this.selected.boxTypeMsg = [];
      value.forEach((v, k) => {
        DATA.boxInfoArr[k].forEach(item => {
          if (item.value === v) {
            this.selected.boxTypeMsg.push(item.name)
          }
        })
      })
      this.selected.boxType = value;
    },
    arrFormTest(arr) {
      var re = new RegExp("^[a-zA-Z]+$");
      return arr.every(item => {return re.test(item) === true})
    },
    orderFormat() {
      var msg = '';
      if (this.selected.to === '') {
        msg = '请填写送达地点后重新提交！'
      }
      if (this.selected.from === '') {
        msg = '请选择快递公司后重新提交！'
      }
      if (this.selected.boxType.some(item => {return item === ''})) {
        msg = '请选择快递类型后重新提交！'
      }
      if (msg === '') {
        return { 
          msg: msg,
          params:{
            from: this.selected.from,
            to: this.selected.to,
            boxType: this.selected.boxType,
            money: this.selected.money
          }
        }
      } else {
        return {msg}
      }
      // console.log("req", req)
    }
  }

}
</script>

<style>
.sendpage-container {
  z-index: 10;

  height: 4rem;

  position: fixed;
  bottom: 1.25rem;
  left: .25rem;
  right: .25rem;

  background: #fff;
  text-align: left;
  font-size: .25rem;
  padding: .25rem
}
.select-btn {
  font-size: .125rem;

  width: 80%;
}
</style>
