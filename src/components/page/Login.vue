<template>
  <div id="login-container">
    <h2>欢迎{{ loginPageType ? '登录' : '注册' }} (0.0)</h2>
    <span style="float:right" @click="changeLogType">{{ loginPageType  ? toLogUpMsg : toLogInMsg}}</span>
    <group v-if="loginPageType">
      <x-input title="用户名" v-model="login.name"></x-input>
      <x-input title="密码" v-model="login.password"></x-input>
      <x-button type="primary" @click.native="toLogin">登录</x-button>
    </group>
    <group v-if="!loginPageType">
      <x-input title="用户名" v-model="logup.name" placeholder="请使用数字和字母的组合" :is-type="nameCheck"></x-input>
      <x-input title="密码" @on-change="passwordDouCheck" v-model="logup.password" placeholder="请使用数字和字母的组合" :is-type="nameCheck"></x-input>
      <x-input title="确认密码" @on-change="passwordDouCheck" v-model="secPwd" placeholder="请保持与输入的密码一致"></x-input>
      <h4>{{errMsg}}</h4>
      <x-button type="primary" @click.native="toLogup">注册</x-button>
    </group>
  </div>
  
</template>


<script>
import { Group ,XInput ,XButton } from 'vux'
export default {
  components: {
    Group, XInput, XButton 
  },
  data() {
    return {
      login:{
        name: 'boyuan',
        password: '123',
      },
      logup:{
        name: '',
        password: ''
      },
      loginPageType: true, // true => login; false => logup
      toLogUpMsg: '我还没有账号',
      toLogInMsg : '我要登录',
      nameRe: new RegExp("^[A-Za-z0-9]+$"),
      errMsg: '',
      secPwd: ''
    }
  },
  methods: {
    toLogin() {
      const params = {
        name: this.login.name, 
        password: this.login.password
      }
      this.$http.post('/boyuan/login',params).then(res => {
        console.log(res)
        if (res.data.result.code === 0) {
          this.$store.state.userName = this.login.name
          localStorage.setItem('boyuan',res.data.data.token);
          this.$vux.toast.show({
            text: `登陆成功！${this.login.name}, 欢迎你`,
            time: 1000
          })
          this.$router.push('/send')
          
        } else {
          localStorage.setItem('boyuan',null);
          this.$vux.toast.show({
            text: res.data.result.msg,
            time: 1000
          })
        }
      }, () => {
        this.$vux.toast.show({
          text: '网络错误，请检查网络连接后重试！',
          time: 1000
        })
      })
    },
    toLogup() {
      if (this.logup.name === '') {
        this.$vux.toast.show({
          text: '用户名为空！',
          time: 1000
        });
        return;
      } else if (this.logup.password === '' || this.secPwd === '') {
        this.$vux.toast.show({
          text: '密码为空！',
          time: 1000
        });
        return;
      }
      if (!this.nameRe.test(this.logup.name)) {
        this.$vux.toast.show({
          text: '用户名格式错误!',
          time: 1000
        });
        return;
      } else if(!this.nameRe.test(this.logup.password)) {
        this.$vux.toast.show({
          text: '密码格式错误!',
          time: 1000
        });
        return;
      } else if (this.secPwd != this.logup.password) {
        this.$vux.toast.show({
          text: '两次密码不一致!',
          time: 1000
        });
        return;
      }
      const params = Object.assign({}, this.logup)
      this.$http.post('/boyuan/logup', params).then(res => {
        console.log(res)
        if(res.data.result.code === 0) {
          this.$vux.toast.show({
            text: '注册成功，返回登录页面!',
            time: 1000
          });
          this.login.name = this.logup.name;
          this.login.password = '';
          this.logup.name = '';
          this.logup.password = '';
          this.secPwd = '';
          this.loginPageType = true
        } else {
          this.$vux.toast.show({
            text: res.data.result.msg,
            time: 1000
          });
        }
      })
      console.log(params)
    },
    nameCheck(str) {
      return {valid: this.nameRe.test(str), msg: '只能由数字和字母构成'}
    },
    passwordDouCheck() {
      if (this.secPwd === '') {this.errMsg = '';return};
      this.errMsg = this.secPwd === this.logup.password ? '' : '两次密码不一致！'
    },
    changeLogType() {
      this.loginPageType = !this.loginPageType;
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
