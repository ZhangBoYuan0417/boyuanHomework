<template>
  <div id="login-container">
    <h1>您好，请先登录</h1>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="name"></mt-field>
    <mt-field label="密码" type='password' placeholder="请输入密码" v-model="password"></mt-field>
    <mt-button type="primary" @click="login">登录</mt-button>
  </div>
  
</template>


<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      name: 'boyuan',
      password: '123'
    }
  },
  methods: {
    login() {
      const params = {
        name: this.name, 
        password: this.password
      }
      this.$http.post('/boyuan/login',params).then(res => {
        console.log(res)
        if (res.data.result.code === 0) {
          sessionStorage.setItem('boyuan',res.data.data.token);
          Toast({
            message: `登陆成功！${this.name}, 欢迎你`,
            position: 'bottom',
            duration: 1000
          })
          this.$router.push('/send')
          
        } else {
          sessionStorage.setItem('boyuan',null);
          Toast({
            message: res.data.result.msg,
            position: 'bottom',
            duration: 1000
          })
        }
      }, () => {
        Toast({
          message: '网络错误，请检查网络连接后重试！',
          position: 'bottom',
          duration: 1000
        })
      })
    }
  },
  mounted() {
    // const userInfo = this.$http.get('/boyuan/userInfo/1').then(res => {
    //   console.log(res)
    // })
  }

}
</script>

<style>
#login-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background: #fff;
  text-align: center;

  z-index: 100;
}
</style>
