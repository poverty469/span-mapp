<template>
  <div id="app" v-bind="forceLoad()">
    <the-logo class="the-logo" rel="preload"></the-logo>
    <the-header class="the-header"></the-header>
    <transition name="fade-quick">
      <keep-alive>
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
    <map-dashboard
      mapId="main-map"
      class="main-map-dashboard"
      :dataLoaded="dataLoaded"
      :activeData="activeData"
      :bare="!mapIsFocused && !mapVisited"
    ></map-dashboard>
    <the-footer class="the-footer"></the-footer>
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheLogo from "@/components/TheLogo.vue";
import MapDashboard from "@/components/MapDashboard.vue";

import { mapGetters } from "vuex";
import { setTimeout } from 'timers';

export default {
  name: "app",
  components: {
    MapDashboard,
    TheFooter,
    TheHeader,
    TheLogo
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
      setTimeout(() => this.$store.dispatch("mapLoaded"), 1000);
    }
  },
  computed: {
    ...mapGetters(["appLoading", "dataLoaded", "mapVisited"]),
    mapIsFocused: function() {
      return this.$route.name === "map"; // TODO: make "map" a value pulled in from the router object
    }
  }
};
</script>

<style lang="scss">
body {
  background: $light-tan;
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

.router-view {
  position: fixed;
  top: $header-height;
  bottom: $footer-height;
  left: 0;
  width: $app-width;
  z-index: z("router-view");

  overflow: hidden; // Removes modal jump on showing of modal
}

.main-map-dashboard {
  position: absolute;
  display: inline-grid;
  grid-auto-flow: dense;
  grid-template-columns: auto 250px;
  top: $header-height;
  bottom: $footer-height;
  left: 0;
  width: $app-width;

  z-index: z("main-map-dashboard");
}

.the-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: $app-width;
  height: $footer-height;
  z-index: z("site-footer");
}

.the-splash-page--not-loaded {
  height: 100vh;
}

.test-button-container {
  position: fixed;
  width: fit-content;
  height: auto;
  top: 0;
  left: 50vw;
  transform: translateX(-50%);

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

.fade-long-enter-active,
.fade-long-leave-active {
  transition: opacity 1500ms;
}
.fade-long-enter, .fade-long-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-quick-enter-active,
.fade-quick-leave-active {
  transition: opacity 250ms;
}
.fade-quick-enter, .fade-quick-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 250ms ease-in;
  transform: translateX(0);
  opacity: 1;
}
.slide-left-enter, .slide-left-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: all 250ms ease-out;
  transform: translateX(#{$righter-width});
  opacity: 0;
}

  .shadow {
    box-shadow: 0 0 6em 4em $dark-orange--shadow;
    border-radius: 50%/25%;
    z-index: -2;
  }

  .contact button {
    background: inherit;
    border: $medium-border $dark-orange--border solid;
    font-size: 24px !important;
    color: $dark-orange--border;
    text-transform: uppercase;
  }

  .contact button:hover {
    background: $dark-orange--shadow;
    color: $light-orange;
  }

  .address h3 {
    margin: 2em 0em 0em 1em;
    padding: 0.5em;
    font-size: 24px !important;
    color: $dark-orange;
  }

  .contact-container h1 {
    color: $light-orange !important;
    font-size: 32px !important;
  }
</style>
