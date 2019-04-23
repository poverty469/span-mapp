<template>
  <div id="app">
    <the-map-dashboard class="map-container"></the-map-dashboard>
  </div>
</template>

<script>
import TheMapDashboard from "./components/TheMapDashboard.vue";

export default {
  name: "app",
  components: {
    TheMapDashboard
  }
};
</script>

<style lang="scss">
@import "styles/_settings";

* {
  margin: 0;
  padding: 0;
}
#app {
  padding: absolute;
  top: 0;
  left: 0;
  width: $appWidth;
  height: $appHeight;
}
.map-container {
  position: fixed;
  top: 0;
  left: 0;
  width: $appWidth;
  height: $appHeight;
}
</style>
