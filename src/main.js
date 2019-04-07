// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import store from './vuex/store';
import jwt from 'jsonwebtoken';

import  { ToastPlugin, ConfirmPlugin } from 'vux'
Vue.use(ToastPlugin, {position: 'top', type: 'text', width:'5rem', time: '5000'})
Vue.use(ConfirmPlugin)
 
Vue.use(Mint);

require("./assets/js/rem.js")

require("./assets/css/reset.css")
require("./assets/css/common.css")

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8889/',
})

Vue.prototype.$eventHub = new Vue();

Vue.config.productionTip = false

router.beforeEach((to,from,next) =>{
  const token = localStorage.getItem('boyuan');
  if(to.path == '/'){ // 如果是跳转到登录页的
    if(token != 'null' && token != null){
      next('/send') // 如果有token就转向todolist不返回登录页
    }
    next(); // 否则跳转回登录页
  }else{
    if(token != 'null' && token != null){
      next() // 如果有token就正常转向
    }else{
      next('/') // 否则跳转回登录页
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
