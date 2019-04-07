<template>
  <div class="op-container">
    <!-- <step class="step-process" v-model="order.orderType">
      <step-item title="" description="暂无人接单"></step-item>
      <step-item title="" description="快递尚未领取"></step-item>
      <step-item title="" description="送快递中"></step-item>
      <step-item title="" description="订单已完成"></step-item>
    </step> -->
    <divider>快递状态</divider>
    <h3 class="order-msg"> {{stepData[order.orderType]}} </h3>
    <x-button type="primary" v-if="~~[1,2].indexOf(order.orderType) >= 0" action-type="button" @click.native="handleBtn">{{btnMsg[order.orderType - 1]}}</x-button>
  </div>
</template>
<script>
import { XButton, Divider  } from 'vux'
import DATA from '../../assets/js/data'
export default {
  components: {
    XButton, Divider 
  },
  data() {
    return {
      order: {},
      stepData: ['暂无人接单'],
      // stepData: ['暂无人接单','快递尚未领取','送快递中','订单完成'],
      btnMsg: ['快递已领取', '快递已送达']
    }
  },
  mounted() {
    console.log('myorder', this.myOrder)
    this.$eventHub.$on('initMyOrder', this.initMyOrder)
    // console.log(this.initMyOrder.orderType)
  },
  methods: {
    initMyOrder(order) {
      console.log('ffff', order.from)
      this.stepData.push(`快递尚未领取,请尽快赶到 ${DATA.expressObj[order.from].name} 领取快递！`)
      this.stepData.push('快递运送中')
      this.stepData.push('订单已完成')
      this.order = order;
    },
    handleBtn() {
      const params = {
        'set': {
          'orderType': this.order.orderType + 1,
        },
        'where': {
          'getId': this.$store.state.userName,
          'orderId': this.order.orderId
        }
      }
      console.log('params', params)
      this.$http.post('/boyuan/updateOrder', params).then( res => {
        console.log(this.order.orderType)
        if (this.order.orderType === 2) {
          this.$vux.toast.show({
          text: '恭喜您，订单已完成，即将返回订单页面',
          time: 1000
        });
        }
        this.$eventHub.$emit('refresh-orders')
      })
    }
  },
  beforeDestroy() {
    this.$eventHub.$off('initMyOrder')
  }
}
</script>
<style>
/* .step-process /deep/ .vux-step-item-title{
  font-size: 0.2rem;
  background-color: #fbf9fe; 
} */
.order-msg {
  text-align: center;
}
</style>
