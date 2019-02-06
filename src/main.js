// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import store from './vuex/store'
 
Vue.use(Mint);

require("./assets/js/rem.js")

require("./assets/css/reset.css")
require("./assets/css/common.css")

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8889/'
})

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to,from,next) =>{
  const token = sessionStorage.getItem('boyuan');
  if(to.path == '/'){
    sessionStorage.setItem('boyuan',null);
    next(); 
  }else{
    if(token != 'null' && token != null){
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证
      next() 
    }else{
      next('/') 
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
