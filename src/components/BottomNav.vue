<template>
    <div id="nav-container">
        <div :class="['nav-item', selected === '/send' ? 'selected' : '']" @click="changeTab('send')">
            <img :src="imageSrc.sendSrc" alt="" class="nav-img"> <br />
            发单
        </div>
        <div :class="['nav-item', selected === '/get' ? 'selected' : '']" @click="changeTab('get')">
            <img :src="imageSrc.getSrc" alt="" class="nav-img"> <br />
            抢单
        </div>
        <div :class="['nav-item', selected === '/order' ? 'selected' : '']" @click="changeTab('order')">
            <img :src="imageSrc.orderSrc" alt="" class="nav-img"> <br />
            订单
        </div>
        <div :class="['nav-item', selected === '/me' ? 'selected' : '']" @click="changeTab('me')">
            <img :src="imageSrc.meSrc" alt="" class="nav-img"> <br />
            我
        </div>
    </div>
</template>
<script>
    import sendOrder from '../assets/send.png'
    import sendOrderActive from '../assets/send-active.png'
    import getOrder from '../assets/get.png'
    import getOrderActive from '../assets/get-active.png'
    import orderInfo from '../assets/order.png'
    import orderInfoActive from '../assets/order-active.png'
    import aboutMe from '../assets/me.png'
    import aboutMeActive from '../assets/me-active.png'
    export default {
        data() {
            return {
                imageSrc: {},
                selected: ''
            }
        },
        mounted() {
            console.log(this.$route.path)
            this.selected = this.$route.path
        },
        methods: {
            changeTab(pageName){
                this.$router.push(pageName)
            }
        },
        watch: {
            selected(nv) {
                const sendSrc = nv === '/send' ? sendOrderActive : sendOrder;
                const getSrc = nv === '/get' ? getOrderActive : getOrder;
                const orderSrc = nv === '/order' ? orderInfoActive : orderInfo;
                const meSrc = nv === '/me' ? aboutMeActive : aboutMe;
                this.$set(this.imageSrc, 'sendSrc', sendSrc)
                this.$set(this.imageSrc, 'getSrc', getSrc)
                this.$set(this.imageSrc, 'orderSrc', orderSrc)
                this.$set(this.imageSrc, 'meSrc', meSrc)
            },
            '$route'(to, from) {
                this.selected = to.path
            }
  
        }
    }
</script>
<style>
#nav-container {
    height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    font-size: 0.25rem;
    background: #fff;
    z-index: 10;
}
.nav-item {
    width: 25%;
    color: #dbdbdb
}
.selected{
    color: #399bff
}
.nav-img {
    width: 0.4rem;
    margin-top: 0.05rem
}
</style>