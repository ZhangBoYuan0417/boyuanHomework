<template>
  <div class="myinfo-container">
    <card :header="{title: `你好，${$store.state.userName}`}">
      <div slot="content" class="card-content">
        <div class="card-element">
          <span>{{ myInfo.send }}</span>
          <br>我发出的订单
        </div>
        <div class="card-element">
          <span>{{ myInfo.get }}</span>
          <br>我抢到的订单
        </div>
      </div>
    </card>
    <x-button type="primary" @click.native="quitLog">退出登录</x-button>
  </div>
</template>

<script>
import { Card, XButton } from "vux";
export default {
  components: {
    Card,
    XButton
  },
  data() {
    return {
      myInfo: {
        get: "",
        send: ""
      }
    };
  },
  mounted() {
    this.initMyInfo();
  },
  methods: {
    initMyInfo() {
      const params = {
        userName: this.$store.state.userName
      };
      this.$http.post("/boyuan/orderNum", params).then(res => {
        res = res.data;
        this.$set(this.myInfo, "get", res.data.getOrdersNum);
        this.$set(this.myInfo, "send", res.data.sendOrdersNum);
      });
    },
    quitLog() {
      localStorage.setItem('boyuan',null);
      this.$store.state.userName = ''    
      this.$router.push('/')
    }
  }
};
</script>

<style>
.myinfo-container {
  z-index: 10;

  position: fixed;
  top: 0.7rem;
  bottom: 1.25rem;
  left: 0.25rem;
  right: 0.25rem;

  background: #fff;
  text-align: left;
  font-size: 0.25rem;
  padding: 0.25rem;

  overflow: scroll;
}
.card-content {
  display: flex;
  padding: 10px 0;
}
.card-element {
  flex: 1;
  text-align: center;
  font-size: 19px;
}
</style>
