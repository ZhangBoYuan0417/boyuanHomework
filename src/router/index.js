import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/page/Login.vue'

import SendOrder from '../components/page/SendOrder.vue'
import GetOrder from '../components/page/GetOrder.vue'
import OrderInfo from '../components/page/OrderInfo.vue'
import AboutMe from '../components/page/AboutMe.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/send',
      name: 'SendOrder',
      component: SendOrder
    },
    {
      path: '/get',
      name: 'GetOrder',
      component: GetOrder
    },
    {
      path: '/order',
      name: 'OrderInfo',
      component: OrderInfo
    },
    {
      path: '/me',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
