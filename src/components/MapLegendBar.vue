<template>
  <section class="map__legends-bar">
    <map-legend
      v-for="(layer, index) in layers"
      :key="`map-legend-${index}`"
      :title="getLayerTitle(layer)"
    ></map-legend>
  </section>
</template>
<script>
import MapLegend from "@/components/MapLegend";

export default {
  name: "MapLegendBar",
  components: {
    MapLegend
  },
  props: {
    layers: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    getLayerTitle(layer) {
      return layer.dataset.geographies[layer.geographyId][layer.attributeId]
        .title;
    }
  }
};
</script>
<style lang="scss" scoped>
$legends-bar-margin: 10px;

.map__legends-bar {
  position: absolute;
  left: 0;
  bottom: $mapbox-logo-height;
  margin: $legends-bar-margin;
  height: fit-content;
  max-height: calc(100% - (#{$legends-bar-margin} * 2));
  overflow: auto;
}

.map__legends-bar > * {
  margin-bottom: 0.8rem;
}

.map__legends-bar > *:last-child {
  margin-bottom: 0;
}
</style>
