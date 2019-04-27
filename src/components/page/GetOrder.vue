<template>
    <div class="getpage-container">
      <div v-show="hasOrder">
        <order-operation></order-operation>
      </div>
      <div v-show="!hasOrder">
        <order-info v-for="(v, k) in orders" :key="k" :orderData="v" orderInfoType="get"></order-info>
        <div v-if="noOrders">暂无订单，请稍后刷新下试试。。。</div>
      </div>
    </div>
</template>
<script>
import OrderInfo from '../common/OrderInfo'
import OrderOperation from '../common/OrderOperation'
export default {
  components: {
    OrderInfo, OrderOperation
  },
  data() {
    return {
      orders: new Array,
      noOrders: false,
      hasOrder: '',
    }
  },
  mounted() {
    this.initMyOrder();
    this.$eventHub.$on('refresh-orders', this.initMyOrder)
  },
  methods: {
    initMyOrder() {
      const params = {
        'where': {
          'orderType': {'$between': [1,2]},
          'getId': {'$eq': this.$store.state.userName},
          'sendId': {'$ne': this.$store.state.userName}
        }
      }
      this.$http.post('/boyuan/getorders',{params}).then(res => {
        res = res.data;
        console.log('res', res.data)
        if (res.data.length != 0) {
          this.hasOrder = true;
          // this.myOrder = res.data[0]
          console.log('res.data', res.data)
          this.$eventHub.$emit('initMyOrder', res.data[0])
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
        if(res.data.length != 0) {
          this.orders = res.data;
          this.noOrders = false;
        } else {
          this.orders = []
          this.noOrders = true;
        }
      })
    }
  },
  beforeDestroy() {
    this.$eventHub.$off('refresh-orders')
  }
    
}
</script>
<style>
.getpage-container {
  z-index: 10;

  height: 4.5rem;

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
