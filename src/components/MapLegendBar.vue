<template>
  <section class="map__legends-bar">
    <map-legend></map-legend>
    <map-legend></map-legend>
  </section>
</template>
<script>
import MapLegend from "@/components/MapLegend";

export default {
  name: "MapLegendBar",
  components: {
    MapLegend
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
