<template>
  <div id="app">
    <header-nav></header-nav>        
    <d-map></d-map>
    <router-view></router-view>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import headerNav from './components/HeaderNav'
import bottomNav from './components/BottomNav'
import dMap from './components/common/DMap'
export default {
  name: 'App',
  data(){
    return {
      selected: ''
    }
  },
  components: {
    bottomNav,
    dMap,
    headerNav
  },
  mounted() {
    // console.log(this.$router)
    // this.$http.get('/boyuan/userInfo',{
    //   id: 1
    // })
  }

}
</script>

<style>
#app {
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
