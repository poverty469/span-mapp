<template>
  <div class="map-container">
    <div id="the-map" class="map"></div>
  </div>
</template>

<script>
import mb from "mapbox-gl";
import boundsEnum from "../../mock-data/bounds";

export default {
  name: "TheMap",
  props: {},
  data: function() {
    return {
      map: undefined
    };
  },
  mounted: function() {
    mb.accessToken = process.env.VUE_APP_MAPBOX_API_ACCESS_TOKEN;
    this.map = new mb.Map({
      container: "the-map",
      style: "mapbox://styles/jacksonrya/cjutds7pm2jq71fom14q9x1ws",
      bounds: new mb.LngLatBounds(
        boundsEnum.washington.sw,
        boundsEnum.washington.ne
      ),
      fitBoundsOptions: {
        padding: this.$store.getters.mapFocusPadding
      }
    });
  },
  methods: {
    /**
     * Zooms to the provided bounding box corners.
     * @param {Object} corners The boundind box vertices coordinates.
     * @property {array<number>} sw The southwest vertex coordinates.
     * @property {array<number>} ne The northeast vertex coordinates.
     */
    zoomToBounds: function({ sw, ne }) {
      let bounds = new mb.LngLatBounds(sw, ne);
      this.map.fitBounds(bounds, {
        padding: this.$store.getters.mapFocusPadding
      });
    }
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
