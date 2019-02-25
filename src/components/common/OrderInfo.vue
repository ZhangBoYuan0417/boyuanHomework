<template>
  <div class="order-container">
    <div @click="isDetailShow = !isDetailShow">订单：从 {{ from }} => 到 {{ orderData.to }} </div>
    <div class="detail-info" v-show="isDetailShow">
      起点：{{ from }} <br />
      终点：{{ orderData.to }} <br />
      发单时间：{{ sendTime }} <br />
      支付金额：{{ orderData.money }} <br />
      快递大小：{{ boxSize }} <br />
      是否易碎：{{ needCareful }} <br />
      <x-button type="primary" @click.native="toGetIt">我要抢单！</x-button>
    </div>
  </div>
</template>
<script>
import DATA from '../../assets/js/data.js';
import { dateFormat, XButton } from 'vux'
export default {
  props: ['orderData'],
  components: { XButton },
  data() {
    return {
      from: '',
      to: '',
      sendTime: '',
      boxSize: '',
      needCareful: '',
      isDetailShow: false
    }
  },
  mounted() {
    this.initOrderInfo();
  },
  methods: {
    initOrderInfo() {
      console.log(DATA)
      let arr = this.orderData.boxType.split(',');
      this.boxSize = DATA.boxSize[arr[0]];
      this.needCareful = arr[1] === 'careful' ? '是的' : '不是';
      this.from = DATA.expressObj[this.orderData.from]['name'];
      this.sendTime = dateFormat(new Date(Number(this.orderData.sendTime)), 'YYYY-MM-DD HH:mm')
    },
    showDetail() {

    },
    toGetIt() {
      // console.log('hehe', this.$store.state.userName)
      return
      const params = {
        'set': {
          'orderType': 1,
          'getId': this.$store.state.userName
        },
        'where': {
          'orderId': this.orderData.orderId
        }
      }
      this.$http.post('/boyuan/updateOrder', params).then(res => {
        this.$vux.toast.show({
          text: '抢单成功',
          time: 1000
        })
      })
    }
  }
  
}
</script>
<style>
.order-container {
  background: #b9dcff;
  margin-bottom: .25rem
}
.detail-info {
  /* float: right; */
  /* text-align: right */
}
</style>

