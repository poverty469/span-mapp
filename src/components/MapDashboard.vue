<template>
  <div class="map-dashboard">
    <mb-map
      class="map-dashboard__map"
      :mapId="mapId"
      :activeData="activeData"
      @mapLoaded="handleMapLoaded"
      @featureHovered="handleFeatureHovered"
      :bare="bare"
      :mapPadding="mapPadding"
      :class="{ 'map-dashboard__map--expanded': bare }"
    >
      <map-legend-bar v-show="!bare" :layers="activeData"></map-legend-bar
    ></mb-map>
    <transition name="slide-left">
      <info-bar v-show="!bare" class="map-dashboard__info-bar"></info-bar>
    </transition>
  </div>
</template>

<script>
import _ from "lodash";

import MbMap from "@/components/MbMap";
import MapLegendBar from "@/components/MapLegendBar";
import InfoBar from "@/components/InfoBar";

import geographies from "@/assets/geographies";

export default {
  name: "MapDashboard",
  components: {
    MapLegendBar,
    MbMap,
    InfoBar
  },
  props: {
    // Id of the mapbox map
    mapId: {
      type: String,
      required: true
    },
    dataLoaded: {
      type: Boolean,
      required: true
    },
    activeData: {
      type: Array,
      required: true,
      default: function() {
        return [];
      },
      validator: function(datasets) {
        // Validate whether or not there is only one geography type in the datasets
        let geogIsDistricts = false;
        let geogIsCounties = false;

        // If a type if not found, check to see if it exists
        datasets.forEach(data => {
          !geogIsDistricts
            ? (geogIsDistricts = data.geographyId === geographies.districts.id)
            : null;
          !geogIsCounties
            ? (geogIsCounties = data.geographyId === geographies.counties.id)
            : null;
        });

        return !(geogIsDistricts && geogIsCounties);
      }
    },
    bare: {
      type: Boolean,
      required: false,
      default: function() {
        return false;
      }
    }
  },
  data: function() {
    return {
      hoveredFeature: {},
      mapPadding: {
        top: 50,
        right: 50 + 10, // + 50 padding + 10 px to accomodate right shift into info bar
        bottom: 50,
        left: 50 // + <50 padding
      }
    };
  },
  watch: {
    activeData: {
      handler: function() {
        this.resizeMapForLegendBar();
      },
      deep: true
    },
    bare: {
      handler: function() {
        this.resizeMapForLegendBar();
      }
    }
  },
  methods: {
    handleMapLoaded: function() {
      if (process.env.NODE_ENV == "production") {
        _.delay(() => this.$store.dispatch("mapLoaded"), 250);
      }
    },
    handleFeatureHovered(feature) {
      this.hoveredFeature = feature;
    },
    resizeMapForLegendBar() {
      const prev = this.mapPadding.left;
      if (this.bare || this.activeData.length === 0) {
        this.mapPadding.left = 50;
      } else {
        this.mapPadding.left = 200;
      }

      prev != this.mapPadding.left
        ? _.delay(() => window.dispatchEvent(new Event("resize")), 50)
        : null;
    }
  },
  computed: {
    /**
     * Returns the legend data of the active layers
     */
    legendData: () => {
      return this.activeLayers.map(layer => {
        if (!layer.hasOwnAttribute("classBreaks")) {
          console.error("No class breaks provided for " + layer.name);
        }
        if (!layer.hasOwnAttribute("classColors")) {
          console.error("No class colors provided for " + layer.name);
          return;
        }

        // Extracts and returns a subset of properties from the layer object
        return (({ classBreaks, classColors }) => ({
          classBreaks,
          classColors
        }))(layer);
      });
    },
    hoveredFeatureName: function() {
      return !_.isEmpty(this.hoveredFeature)
        ? this.hoveredFeature.properties.NAME
        : "";
    }
  }
};
</script>

<style lang="scss">
$map-width: calc(100vw + #{$map-right-shift});

.map-dashboard__map {
  transition: all 250ms ease-in;
  width: calc(#{$map-width} - #{$righter-width});
  // grid-column-end: 2;
  // grid-column-start: 1;
}

.map-dashboard__map--expanded {
  transition: all 250ms ease-out;
  width: calc(#{$map-width});
  // grid-column-end: 3;
}

.map-dashboard__info-bar {
  width: $righter-width;
  // grid-column-start: 2;
  // grid-column-end: 3;
}
</style>
