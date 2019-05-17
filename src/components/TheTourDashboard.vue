<template>
  <div class="the-tour-dashboard">
    <div class="tour__header">
      <h1 class="tour__title">{{ activeSlide.title }}</h1>
      <h2 v-show="activeSlide.subtitle" class="tour__subtitle">
        {{ activeSlide.subtitle }}
      </h2>
      <div class="tour__close-button"></div>
    </div>
    <div class="tour__body">
      <mb-map
        v-show="activeData"
        :mapId="mapId"
        :activeData="activeData"
        :class="{ 'map-container--hidden': !mapVisible }"
        @mapLoaded="handleMapLoaded"
      ></mb-map>
      <div class="tour__sidebar">
        <the-tour-info></the-tour-info>
        <the-tour-nav></the-tour-nav>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import MbMap from "@/components/MbMap.vue";
import TheTourInfo from "@/components/TheTourInfo.vue";
import TheTourNav from "@/components/TheTourNav.vue";

import tourSlides from "@/assets/data/TourSlides.js";

export default {
  name: "TheTourDashboard",
  components: {
    MbMap,
    TheTourInfo,
    TheTourNav
  },
  props: {},
  data: function() {
    return {
      mapId: "tour__map",
      tourSlides: tourSlides,
      activeTourSlideIndex: 0,
      mapLoaded: false,
      mapVisible: false
    };
  },
  methods: {
    nextTourSlide() {
      this.activeTourSlideIndex++;
    },
    handleMapLoaded() {
      this.mapLoaded = true;
      _.delay(() => (this.mapVisible = true), 250);
    }
  },
  computed: {
    activeSlide: function() {
      if (this.tourSlides) {
        return this.tourSlides[this.activeTourSlideIndex];
      }

      return null;
    },
    activeData: function() {
      if (
        this.mapLoaded &&
        this.activeSlide &&
        this.activeSlide.hasOwnProperty("dataLayers")
      ) {
        return this.activeSlide.dataLayers;
      } else {
        return [];
      }
    }
  }
};
</script>

<style lang="scss">
$tour-dashboard__header-height: 65px;
$tour-dashboard__body-height: calc(100% - #{$tour-dashboard__header-height});

.the-tour-dashboard {
  padding: 20px 0px 35px 0px;
}

.tour__header,
.tour__body {
  position: relative;
  display: block;
  width: 100%;
}

.tour__header {
  height: $tour-dashboard__header-height;
}

.tour__body {
  display: inline-flex;
  height: $tour-dashboard__body-height;
}

.tour__map,
.tour__sidebar {
  position: relative;
  display: inline-block;
  height: 100%;
}

$tour__sidebar-width: 30%;
$tour__map-margin-left: 22px;

.tour__body > .map-container {
  width: calc(100% - #{$tour__sidebar-width} - #{$tour__map-margin-left});
  margin-left: $tour__map-margin-left;

  border-radius: 8px;
  border: $thick-border solid $dark-orange--border;

  overflow: hidden;
  opacity: 1;

  transition: 150ms;
}

.tour__sidebar {
  width: $tour__sidebar-width;
}

.tour__body > .map-container--hidden {
  opacity: 0;
  transition: 150ms;
}
</style>
