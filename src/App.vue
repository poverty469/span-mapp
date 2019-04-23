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
* {
  margin: 0;
  padding: 0;
}
#app {
  padding: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.map-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
