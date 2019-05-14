<template>
  <div id="app">
    <!-- temp tag to test loading states -->
    <div class="test-button-container">
      <button
        v-show="!appLoading"
        class="test-button"
        @click="forceToggleMapData()"
      >
        Toggle Map Data
      </button>
      <button class="test-button" @click="forceLoad()">'Force load'</button>
    </div>
    <the-logo class="the-logo" rel="preload"></the-logo>
    <the-header class="the-header"></the-header>
    <transition name="fade">
      <the-splash-page
        v-show="appLoading"
        class="the-splash-page"
        rel="preload"
      ></the-splash-page>
    </transition>
    <the-tour-dashboard class="the-tour-dashboard"></the-tour-dashboard>
    <map-dashboard
      mapId="main-map"
      class="main-map-dashboard"
      :dataLoaded="dataLoaded"
      :activeData="activeData"
    ></map-dashboard>
    <the-footer class="the-footer"></the-footer>
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheLogo from "@/components/TheLogo.vue";
import MapDashboard from "@/components/MapDashboard.vue";
import TheTourDashboard from "@/components/TheTourDashboard.vue";
import TheSplashPage from "@/components/TheSplashPage.vue";

import geographies from "@/assets/geographies";
import povertyData from "@/assets/data/dataLayer";

import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    MapDashboard,
    TheFooter,
    TheHeader,
    TheLogo,
    TheSplashPage,
    TheTourDashboard
  },
  created: async function() {
    await this.$store.dispatch("initLayerData");
  },
  data: function() {
    return {
      // Object with data layer and geography to be selected
      activeData: [
        // {
        //   dataset: undefined,
        //   geographyId: undefined
        // }
      ]
    };
  },
  methods: {
    /**
     * TEMPORARY
     * Forces the state of the app from loading to loaded
     */
    forceLoad() {
      this.$store.dispatch("mapLoaded");
    },
    forceToggleMapData() {
      this.activeData.length == 0
        ? this.activeData.push({
            dataset: povertyData,
            geographyId: geographies.counties.id,
            attributeId: "HC03_VC161",
            style: "choropleth"
          })
        : this.activeData.pop();
    }
  },
  computed: {
    ...mapGetters(["appLoading", "dataLoaded"])
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
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
  z-index: z("logo");
}

.the-header {
  position: absolute;
  top: 0;
  left: 0;
  width: $app-width;
  height: $header-height;
  z-index: z("site-header");
}

.the-tour-dashboard {
  z-index: z("tour-dashboard");
}

.main-map-dashboard {
  position: absolute;
  top: $header-height;
  bottom: $footer-height;
  left: 0;
  width: $app-width;

  z-index: z("main-map");
}

.the-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: $app-width;
  height: $footer-height;
  z-index: z("site-footer");
}

.the-splash-page {
  position: absolute;
  z-index: z("splash-page");
  height: 100vh;
  width: 100vw;
}

.test-button-container {
  position: fixed;
  width: fit-content;
  height: auto;
  top: 0;
  left: 50vw;

  z-index: z("test-object");
}

// Temporary
.test-button {
  position: relative;
  display: inline-block;
  margin-right: 3px;

  width: auto;
  height: 15px;
  background: transparent;
  outline: 0.5px solid black;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1500ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.mapboxgl-ctrl-attrib.mapboxgl-compact {
  margin: 0 !important;
}

.mapboxgl-ctrl-scale {
  border-width: 2px;
  border-style: solid;
}

.mapboxgl-ctrl-group:not(:empty) {
  box-shadow: 0 0 0 2px $dark-grey !important;
  border-radius: 0;
}

.mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-out {
  transform: translateY(2px);
}

.mapboxgl-ctrl-group > button + button {
  outline: 2px solid $dark-grey;
  border-top: 0 !important;
}
</style>
