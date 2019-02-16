<template>
    <div id="map-container">

    </div>
</template>
<script>
// import L from 'leaflet'
export default {
    mounted() {
        console.log('map init')
        var map = new AMap.Map('map-container', {
            center:[117.000923,36.675807],
            zoom:16,
            // mapStyle: 'amap://styles/macaron',
            layer:[new AMap.TileLayer()],
            center: [126.619484,45.70743]
        });

        var gps = [126.627695,45.714603];
        AMap.convertFrom(gps, 'gps', function (status, result) {
            if (result.info === 'ok') {
                var lnglats = result.locations; // Array.<LngLat>
                console.log(lnglats)
            }
        });
        // map.on('mapmove', () => {
        //     console.log(map.getCenter( ))
        // })
        // var map = L.map('map-container', {
        //     center: [51.505, -0.09],
        //     zoom: 13
        // });
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
        // attribution: '© boyuan'
        // }).addTo(map);
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
