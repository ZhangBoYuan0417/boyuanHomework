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
      <x-button v-if="orderInfoType === 'get'" type="primary" @click.native="toGetIt">我要抢单！</x-button>
      <x-button v-if="orderInfoType != 'get'" type="primary" @click.native="showFlow = !showFlow">订单流程</x-button>
    </div>

    <x-dialog class="" v-model="showFlow" hide-on-blur>
      <timeline class="order-process">
        <timeline-item v-if="orderData.orderType === 3">
          <h4>订单已经完成</h4>
          <p>444</p>
        </timeline-item>
        <timeline-item v-if="orderData.orderType >= 2">
          <h4>快递派送中</h4>
          <p>333</p>
        </timeline-item>
        <timeline-item v-if="orderData.orderType >= 1">
          <h4>取件中</h4>
          <p>222</p>
        </timeline-item>
        <timeline-item>
          <h4>暂无人抢单</h4>
          <p>111</p>
        </timeline-item>
		</timeline>
    </x-dialog>
  </div>
</template>
<script>
import DATA from '../../assets/js/data.js';
import { dateFormat, XButton, XDialog, Timeline, TimelineItem } from 'vux'
export default {
  props: ['orderData', 'orderInfoType'],
  components: { XButton, XDialog, Timeline, TimelineItem },
  data() {
    return {
      from: '',
      to: '',
      sendTime: '',
      boxSize: '',
      needCareful: '',
      isDetailShow: false,
      showFlow: false,

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
      const params = {
        'set': {
          'orderType': 1,
          'getId': this.$store.state.userName,
          'getTime': (new Date()).getTime()
        },
        'where': {
          'orderId': this.orderData.orderId
        }
      }
      this.$http.post('/boyuan/updateOrder', params).then(res => {
        this.$vux.toast.show({
          text: '抢单成功',
          time: 1000
        });
        this.$eventHub.$emit('refresh-orders')
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

.order-container /deep/ .vux-timeline-item-content {
  padding: 0 0 .5rem 1.2rem
}
.order-process p {
  color: #888;
  font-size: 0.3rem;
}
.order-process h4 {
  color: #666;
  font-weight: normal;
}
</style>

