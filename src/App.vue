<template>
  <div id="app">
    <the-logo class="the-logo" rel="preload"></the-logo>
    <the-header class="the-header"></the-header>
    <the-splash-page class="the-splash-page" rel="preload"></the-splash-page>
    <the-tour-dashboard></the-tour-dashboard>
    <the-map-dashboard class="the-map-dashboard"></the-map-dashboard>
    <the-footer class="the-footer"></the-footer>
  </div>
</template>

<script>
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";
import TheLogo from "./components/TheLogo.vue";
import TheMapDashboard from "./components/TheMapDashboard.vue";
import TheTourDashboard from "./components/TheTourDashboard.vue";
import TheSplashPage from "./components/TheSplashPage.vue";

export default {
  name: "app",
  components: {
    TheFooter,
    TheHeader,
    TheLogo,
    TheMapDashboard,
    TheSplashPage,
    TheTourDashboard
  }
};
</script>

<style lang="scss">
@import "styles/_settings";

* {
  margin: 0;
  padding: 0;
}

a {
  width: fit-content;
  height: fit-content;
}

#app {
  padding: absolute;
  top: 0;
  left: 0;
  width: $app-width;
  height: $app-height;

  font-family: $standard-font-family;
}

.the-logo {
  position: absolute;
  top: 0;
  left: 0;
  height: $header-height;
  z-index: 11;
}

.the-header {
  position: absolute;
  top: 0;
  left: 0;
  width: $app-width;
  height: $header-height;
  z-index: 10;

  background: $light-tan;
}

.the-map-dashboard {
  position: absolute;
  top: $header-height;
  bottom: $footer-height;
  left: 0;
  width: $app-width;

  z-index: 0;
}

.the-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: $app-width;
  height: $footer-height;
  z-index: 10;

  background: $light-tan;
}
</style>
