<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import bottomNav from './components/BottomNav'
export default {
  name: 'App',
  data(){
    return {
      selected: ''
    }
  },
  components: {
    bottomNav
  },
  mounted() {
    // console.log(this.$router)
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
