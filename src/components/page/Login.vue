<template>
  <div id="login-container">
    <h1>您好，请先登录</h1>
    
  </div>
  
</template>

<script>
export default {
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
}
</style>
