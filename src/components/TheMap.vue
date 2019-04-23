<template>
  <div class="map-container">
    <div id="the-map" class="map"></div>
  </div>
</template>

<script>
import mb from "mapbox-gl";

export default {
  name: "TheMap",
  props: {},
  data: function() {
    return {
      map: undefined
    };
  },
  mounted: function() {
    mb.accessToken =
      "pk.eyJ1IjoiamFja3NvbnJ5YSIsImEiOiI1TEpRNmYwIn0.d7ij5LVFlONf-bUkDWyQgA";
    // mb.accessToken = process.env.MAPBOX_API_ACCESS_TOKEN;
    this.map = new mb.Map({
      container: "the-map",
      style: "mapbox://styles/jacksonrya/cjutds7pm2jq71fom14q9x1ws",
      bounds: new mb.LngLatBounds(
        [-124.848974, 45.543541],
        [-116.916071, 49.002432]
      ) // Washington bounds
    });
  }
};
</script>

<style lang="scss">
.map,
.map-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
