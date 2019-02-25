<template>
    <div class="getpage-container">
      <div v-show="hasOrder">
        ok
      </div>
      <div v-show="!hasOrder">
        <order-info v-for="(v, k) in orders" :key="k" :orderData="v"></order-info>
        <div v-if="noOrders">暂无订单，请稍后刷新下试试。。。</div>
      </div>
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
      noOrders: false,
      hasOrder: ''
    }
  },
  mounted() {
    this.initMyOrder();
  },
  methods: {
    initMyOrder() {
      const params = {
        'where': {
          'orderType': {'$eq': 1},
          'getId': {'$eq': this.$store.state.userName},
          'sendId': {'$ne': this.$store.state.userName}
        }
      }
      this.$http.post('/boyuan/getorders',{params}).then(res => {
        res = res.data;
        console.log('res', res.data)
        if (res.data.length != 0) {
          this.$vux.toast.show({
            text: '您有订单尚未完成，完成后才能抢新的订单！',
            time: 1000
          })
          this.hasOrder = true;
        } else {
          this.hasOrder = false;
          this.initOrdersInfo();
        }
      })
    },
    initOrdersInfo() {
      const params = {
        'where': {
          'orderType': {'$eq': 0},
          'sendId': {'$ne': this.$store.state.userName}
        }
      }
      this.$http.post('/boyuan/getorders',{params} ).then(res => {
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
