<template>
  <div id="orderInfo-container">
    <br />
    <divider>我发出的订单</divider>
    <br />
    <order-info v-for="(order,key) in mySendOrdersArr" :key="'boyuan-' + key" :orderData="order" orderInfoType="list"></order-info>
    <br />
    <divider>我抢到的订单</divider>
    <br />
    <order-info v-for="(order,key) in myGetOrdersArr" :key="key" :orderData="order" orderInfoType="list"></order-info>
  </div>
</template>

<script>
import orderInfo from '../common/OrderInfo'
import { Divider  } from 'vux'
import { constants } from 'fs';
export default {
  components: {
    orderInfo, Divider 
  },
  data() {
    return {
      order: {
        sendTime: '1550922928',
        sendId: 'boyuan',
        money: 50,
        from: 'zhongt',
        to: 'c26',
        boxType: 's,careful',
        orderType: 1
      },
      myGetOrdersArr: [],
      mySendOrdersArr: [],
    }
  },
  mounted() {
    this.initMyGetOrders();
    this.initMySendOrders();
  },
  methods: {
    initMyGetOrders() {
      let params = {
        'where': {
          'getId': {'$eq': this.$store.state.userName}
        }
      }
      let promise = this.genRequest(params);
      promise.then(res => {
        console.log('get orders 获取完毕', res.data.data)
        this.myGetOrdersArr=this.myGetOrdersArr.concat(res.data.data.reverse())
      })
    },
    initMySendOrders() {
      let params = {
        'where': {
          'sendId': {'$eq': this.$store.state.userName}
        }
      }
      let promise = this.genRequest(params);
      promise.then(res => {
        console.log('send orders 获取完毕', res.data.data)
        this.mySendOrdersArr=this.mySendOrdersArr.concat(res.data.data.reverse())
      })
    },
    genRequest(params) {
      return this.$http.post('/boyuan/getorders', {params})
    }
  }
  
}
</script>


<style>
#orderInfo-container {
  position: fixed;
  left: .25rem;
  right: .25rem;
  top: .7rem;
  bottom: 1rem;

  background: #fff;
  text-align: center;

  z-index: 100;

  overflow: scroll;
}
</style>
