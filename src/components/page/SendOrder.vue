<template>
  <div class="sendpage-container">
    <group style="margin-bottom:100px">
      <popup-picker :data="expressArr" title="从哪拿：" v-model="selected.fromMsg" @on-change='fromChanged'></popup-picker>
      <cell title="送到哪：" :value="`${selected.to || '请选择地址'} >`" @click.native="poiSearchShow"></cell>
      <x-input title="取件码: " placeholder="请在此输入" text-align="right" v-model="selected.boxId"></x-input>
      <popup-picker :data="boxInfoArr" title="快递信息: " v-model="selected.boxTypeMsg" @on-change='boxTypeChanged'></popup-picker>
      <cell title="支付金额：" :inline-desc="selected.money+'元'" primary="content">
        <range v-model="selected.money" :min="10" :max="50" :step="5"></range>
      </cell>
      <x-button @click.native="sendOrder">提交订单</x-button>
    </group>
    <search @result-click="resultClick"
            @on-change="getPoiResult"
            :results="poiResults"
            v-model="poiName"
            position="absolute"
            class="poiSearchPanel"
            ref="search"
    ></search>
  </div>
</template>

<script>
import { XInput, PopupPicker, Group, Range, Cell, XButton, Search } from 'vux';
import DATA from '../../assets/js/data.js'
export default {
  components:{
    XInput, PopupPicker, Group, Range, Cell, XButton, Search
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
        toLatLng: '',
        money: 10,
        boxId: ''
      },
      expressArr: expressArr,
      boxInfoArr: DATA.boxInfoArr,
      poiResults: [],
      poiName: '',
    }
  },
  mounted() {
    this.$eventHub.$on('poiResults', this.setPoiResults)
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
                      <p>取件码：${_this.selected.boxId}</p>
                      <p>快递信息：${_this.selected.boxTypeMsg.join(';')}</p>
                      <p>金额：${_this.selected.money}元</p>
                    </div>`,
          confirmText: '确认完毕，发单！',
          cancelText: '我再看看！',
          onConfirm () {
            const params = Object.assign({}, res.params, {user:`${_this.$store.state.userName}`, sendTime: (new Date()).getTime()})
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
      if (this.selected.boxId === '') {
        msg = '请输入取件码后重新提交！'
      }
      if (msg === '') {
        return { 
          msg: msg,
          params:{
            from: this.selected.from,
            to: this.selected.to,
            boxType: this.selected.boxType,
            money: this.selected.money,
            toLatLng: this.selected.toLatLng,
            boxId: this.selected.boxId
          }
        }
      } else {
        return {msg}
      }
      // console.log("req", req)
    },
    // handleIptChange(val) {
    //   // console.log(val)
    //   this.$eventHub.$emit('autoComplete', val)
    // },
    resultClick(res) {
      console.log(res)
      this.selected.to = res.title;
      this.selected.toLatLng = res.latlng;
      this.$eventHub.$emit('drawMarker', res.location)
      console.log('this.seected', this.selected)
    },
    getPoiResult(val) {
      console.log(val)
      if (val === null) return
      this.$eventHub.$emit('autoComplete', val)
    },
    setPoiResults(res) {
      console.log(res)
      this.poiResults.splice(0)
      if (res === null || res === "NO_PARAMS") return
      res.tips.forEach(v => {
        this.poiResults.push({'title': v.name, 'latlng': `${v.location.lat},${v.location.lng}`, 'location': v.location})
      })
      console.log(this.poiResults)
    },
    poiSearchShow() {
      this.$refs.search.setFocus()
    }
  }

}
</script>

<style>
.sendpage-container {
  z-index: 10;

  height: 4.5rem;

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
.poiSearchPanel {
  /* margin-top: 100px; */
  /* z-index: 1000; */

  position: flex;
  top: 0;
  bottom: 0;

  overflow: scroll;
}
</style>
