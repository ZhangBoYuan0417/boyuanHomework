<template>
  <div id="top-nav">
    菜鸟驿站 
    <span style="float:right">{{$store.state.userName}}, <span class="exitBtn" @click="gotoLogin">退出</span></span>
  </div>
</template>
<script>
import jwt from 'jsonwebtoken'
export default {
  data() {
    return {
    }
  },
  watch: {
    // '$route'() {
    //   this.initUserName();
    // }
  },
  mounted() {
    this.initUserName();
  },
  methods: {
    initUserName() {
      const user = this.getUserInfo() || {id: '', name: ''}
      this.$store.state.userName = user.name;
    },
    getUserInfo() {
      console.log('获取session')
      const token = localStorage.getItem('boyuan');
      if(token != null && token != 'null'){
        console.log(token)
        let decode = jwt.decode(token); // 解析token
        return decode // decode解析出来实际上就是{name: XXX,id: XXX}
      }else {
        return false
      }
    },
    gotoLogin() {
      localStorage.setItem('boyuan',null);
      this.$store.state.userName = ''    
      this.$router.push('/')
    }
  }
}
</script>
<style>
#top-nav {
  text-align: center;
  height: .5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #fff;
  font-size: 0.3rem;
}
.exitBtn {

}
</style>

