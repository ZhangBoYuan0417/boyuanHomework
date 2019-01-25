<template>
    <div id="map-container">

    </div>
</template>
<script>
export default {
    mounted() {
        var map = new AMap.Map('map-container', {
            center:[117.000923,36.675807],
            zoom:11,
            mapStyle: 'amap://styles/macaron'
        });
    }
}
    
</script>
<style>
#map-container {
    width: 400px;
    height: 500px;
}
</style>
