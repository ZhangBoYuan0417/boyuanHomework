<template>
    <div id="map-container">

    </div>
</template>
<script>
export default {
  data() {
    return {
      map: {},
      markers: [],
      walking: {}
    }
  },
  watch: {
    $route() {
      this.clearRoadPlan();
      this.clearAllMarkers();
    }
  },
  mounted() {
    var map = this.map = new AMap.Map('map-container', {
      zoom:16,
      layer:[new AMap.TileLayer()],
      center: [126.619484,45.70743],
      resizeEnable: true,
    });
    console.log('map init')
    this.walking = new AMap.Walking({
        map: map,
    })
    // this.initRoadPlan()

    // AMap.plugin([
    //   'AMap.Scale',
    //   'AMap.Geolocation',
    // ], function(){
    //   console.log('do it')
    //   map.addControl(new AMap.Scale())
    //   map.addControl(new AMap.Geolocation());
    // });

    var gps = [126.627695,45.714603];
    this.$eventHub.$on('autoComplete', this.autoComplete)
    this.$eventHub.$on('drawMarker', this.drawMarker)
    this.$eventHub.$on('roadPlan', this.roadPlan)
    this.$eventHub.$on('clearRoadPlan', this.clearRoadPlan)
  },
  methods: {
    autoComplete(keyword) {
      const _this = this;
      AMap.plugin('AMap.Autocomplete', function(){
        var autoOptions = {
          city: '哈尔滨'
        }
        var autoComplete= new AMap.Autocomplete(autoOptions);
        autoComplete.search(keyword, function(status, result) {
          console.log(result)
          if (result === {}) return;
          _this.$eventHub.$emit('poiResults', result)
        })
      })
    },
    drawMarker(location) {
      console.log('location', location)
      this.clearAllMarkers()
      this.markers.push(new AMap.Marker({position: [location.lng, location.lat]}))
      this.map.setCenter([location.lng, location.lat - 0.001])
      this.map.add(this.markers)
    },
    clearAllMarkers() {
      this.map.remove(this.markers)
      this.markers = []
    },
    initRoadPlan() {
      const _this = this;
      _this.walking = new AMap.Walking({
        map: _this.map
      })
    },
    roadPlan([start, end]) {
      this.walking.search(start, end, (status, info) => {
        console.log(status, info)
        if (status === 'complete') {
          this.$eventHub.$emit('roadInfo', info)
        } else {
          this.$vux.toast.show({
            text: `导航出现错误，请稍后重试 ${info}`,
            time: 1000
          });
        }
      })
    },
    clearRoadPlan() {
      this.walking.clear();
    }
  },
  beforeDestroy() {
    this.$eventHub.$off('autoComplete')
    this.$eventHub.$off('drawMarker')
    this.$eventHub.$off('roadPlan')
    this.$eventHub.$off('clearRoadPlan')
    console.log('map destory')
  }
}
    
</script>
<style>
#map-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: .1rem;
  right: .1rem;
  z-index: 1;
}
</style>
