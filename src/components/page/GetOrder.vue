<template>
    <div class="getpage-container">
      <order-info v-for="(v, k) in orders" :key="k" :orderData="v"></order-info>
      <div v-if="noOrders">暂无订单，请稍后刷新下试试。。。</div>
    </div>
</template>
<script>
import OrderInfo from '../common/OrderInfo'
export default {
  components: {
    OrderInfo
  },
  data() {
    return {
      // orders: {
      //   sendTime: '1550922928',
      //   sendId: 'boyuan',
      //   money: 50,
      //   from: 'zhongt',
      //   to: 'c26',
      //   boxType: 's,careful'
      // }
      orders: new Array,
      noOrders: false
    }
  },
  mounted() {
    this.initOrdersInfo()
  },
  methods: {
    initOrdersInfo() {
      this.$http.post('/boyuan/get0orders').then(res => {
        console.log(res)
        res = res.data
        if(res.result.code === 0) {
          this.orders = res.data;
          this.noOrders = false;
        } else {
          this.orders = []
          this.noOrders = true;
        }
      })
    }
  }
    
}
</script>
<style>
.getpage-container {
  z-index: 10;

  height: 4rem;

  position: fixed;
  bottom: 1.25rem;
  left: .25rem;
  right: .25rem;

  background: #fff;
  text-align: left;
  font-size: .25rem;
  padding: .25rem;

  overflow: scroll
}
</style>
