<template>
  <div class="sendpage-container">
    从哪拿：
    <mt-button type="primary" class="place-select-btn" @click="isPlaceSelect = !isPlaceSelect">{{selected.placeText}}</mt-button>
    <mt-picker :slots="slots" @change="onPlaceChange" v-show="isPlaceSelect"></mt-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: {
        place: '',
        placeText: ''

      },
      isPlaceSelect: false,
      slots: [
        {
          flex: 1,
          values: ['请选择', '中通(学府第一营业部)', '申通(祥园路店)', '顺丰(祥园路店)', '百世汇通(祥园路店)',
          '圆通(书苑街)', '韵达(学府公司)', '天天快递南岗分部'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    onPlaceChange(picker, values) {
      console.log(values)
      this.selected.placeText = `${values[0]}`
    }
  }

}
</script>

<style>
.sendpage-container {
  z-index: 10;

  height: 4rem;

  position: fixed;
  bottom: 1.25rem;
  left: .25rem;
  right: .25rem;

  background: #fff;
  text-align: left;
  font-size: .25rem;
  padding: .25rem
}
.place-select-btn {
  font-size: .125rem;

  width: 80%;
}
</style>
