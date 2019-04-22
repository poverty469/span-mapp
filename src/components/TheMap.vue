<template>
  <div>
    <div id="the-map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "TheMap",
  props: {},
  data: function() {
    return {
      map: new mapboxgl.Map({
        container: "the-map",
        style: "mapbox://styles/mapbox/streets-v9"
      })
    };
  }
};
</script>

<style lang="scss">
</style>
