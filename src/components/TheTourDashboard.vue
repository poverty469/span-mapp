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
      <div v-if="tourSlides && tourSlides.length" class="tour__sidebar">
        <hooper ref="carousel" @slide="updateCarousel">
          <slide
            v-for="(slide, index) in tourSlides"
            :key="`slide-${index}`"
            :index="index"
            class="tour__slide"
          >
            {{ slide.title }}
          <tour-info 
            v-for="object in arr"
            :key="`tour-info-${object}`"
            :narrative="object.Obj"
            :tutorial="object.tut"
          >
          </tour-info>
          </slide>
        </hooper>
        <button @click.prevent="handlePrev">Prev</button>
        <button @click.prevent="handleNext">Next</button>
        <button
          v-for="i in slideIndices"
          :key="i"
          @click.prevent="handleSlideIndicatorClick(i)"
        >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import { Hooper, Slide } from "hooper";

import MbMap from "@/components/MbMap.vue";
import TourInfo from "@/components/TourInfo.vue";
import TheTourNav from "@/components/TheTourNav.vue";

import tourSlides from "@/assets/data/TourSlides.js";

export default {
  name: "TheTourDashboard",
  components: {
    MbMap,
    TourInfo,
    TheTourNav,
    Hooper,
    Slide
  },
  props: {},
  data: function() {
    return {
      mapId: "tour__map",
      tourSlides: tourSlides,
      activeTourSlideIndex: 0,
      mapLoaded: false,
      mapVisible: false,
      arr: [{Obj: 10, tut: 1}, {Obj: 12, tut: 2}]
    };
  },
  methods: {
    handleMapLoaded() {
      this.mapLoaded = true;
      _.delay(() => (this.mapVisible = true), 250);
    },
    handleNext() {
      this.slideNext();
    },
    handlePrev() {
      this.slidePrev();
    },
    handleSlideIndicatorClick(index) {
      this.$refs.carousel.slideTo(index);
    },
    slidePrev() {
      this.$refs.carousel.slidePrev();
    },
    slideNext() {
      this.$refs.carousel.slideNext();
    },
    updateCarousel(payload) {
      this.activeTourSlideIndex = payload.currentSlide;
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
    },
    slideIndices: function() {
      return _.range(this.tourSlides.length);
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

.tour__body > .map-container--hidden {
  opacity: 0;
  transition: 150ms;
}

.tour__sidebar {
  width: $tour__sidebar-width;
}

.hooper-list {
  overflow: hidden;
}

.hooper-track {
  width: fit-content;
  display: flex;
}

.tour__slide {
  display: inline-block;
  width: 250px;
  height: 500px;
}
</style>
