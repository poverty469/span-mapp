<template>
  <div class="the-tour-dashboard">
    <div class="tour__header">
      <h1 class="tour__title">{{ activeSlide.title }}</h1>
      <h2 v-show="activeSlide.subtitle" class="tour__subtitle">
        {{ activeSlide.subtitle }}
      </h2>
      <router-link :to="'/map'" >
        <div class="tour__close-button"></div>
      </router-link>
    </div>
    <div class="tour__body">
      <mb-map
        v-show="activeData"
        :mapId="mapId"
        :activeData="activeData"
        :class="{ 'map-container--hidden': !mapVisible }"
        @mapLoaded="handleMapLoaded"
      >
        <map-legend-bar></map-legend-bar>
      </mb-map>
      <div v-if="tourSlides && tourSlides.length" class="tour__sidebar">
        <hooper ref="carousel" @slide="updateCarousel">
          <slide
            v-for="slide in tourSlides"
            :key="slide"
            class="tour__slide"
          >
          <tour-info 
            :narrative="activeSlide.narrativeHtml"
            :tutorial="activeSlide.tutorialHtml"
          />
          </slide>
        </hooper>
        <div class="nav__container">
          <button class= "nav__buttons" @click.prevent="handlePrev">Prev</button>
          <button class= "nav__buttons" @click.prevent="handleNext">Next</button>
        </div>
        <div class="progress__container">
          <button
            v-for="i in slideIndices"
            class="nav__progress"
            :class="{'activeSlide': i == activeTourSlideIndex}"
            :key="i"
            @click.prevent="handleSlideIndicatorClick(i)"
          >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import { Hooper, Slide } from "hooper";

import MbMap from "@/components/MbMap.vue";
import MapLegendBar from "@/components/MapLegendBar";
import TourInfo from "@/components/TourInfo.vue";
import TheTourNav from "@/components/TheTourNav.vue";
import tourSlides from "@/assets/data/TourSlides.js";

export default {
  name: "TheTourDashboard",
  components: {
    MbMap,
    MapLegendBar,
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
      mapVisible: false
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
      console.log(payload.currentSlide)
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
    },

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

.nav__buttons {
  background-color: $dark-orange;
  text-transform: uppercase;
  padding: 1em;
  font-size: 16px;
  width: 6rem;
  border-radius: 5px;
  margin: 4vw;
}

.nav__buttons:hover {
  background-color: $dark-orange--shadow;
  color: white;
}

.nav__container {
  text-align: center;
  position: relative;
  top: 6vh;
}

.progress__container {
  text-align: center;
  top: 2vh;
}

.nav__progress {
  background: inherit;
  border-color: $dark-grey;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  margin: 6px;
}

.activeSlide {
  background: white;
}

.tour__close-button {
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    right: 20px;
    top: 4px;
    transition: transform .25s ease-in-out;
}

.tour__close-button:hover {
    transform: rotate(180deg);
}

.tour__close-button:before {
    content: "";
    position: absolute;
    display: block;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    height: 0;
    border-top: 4px solid rgba(0,0,0,0.5);
    transform: rotate(45deg);
    transform-origin: center;
}

.tour__close-button:after {
    content: "";
    position: absolute;
    display: block;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    height: 0;
    border-top: 4px solid rgba(0,0,0,0.5);
    transform: rotate(-45deg);
    transform-origin: center;
}

.tour__title {
  color: #F6330C;
  font-family: Muli, sans-serif;
  font-weight: 750;
  font-size: 27px;
  padding-left: 30px;
  letter-spacing: 0.5px;
}

.tour__subtitle {
  color: #4B4B4B;
  font-family: Muli, sans-serif;
  font-size: 14px;
  padding-left: 60px;
}

.hooper-liveregion {
  visibility: hidden;
}
</style>
