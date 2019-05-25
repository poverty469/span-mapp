<template>
  <div>
    <mb-map
      :mapId="mapId"
      :activeData="activeData"
      @mapLoaded="handleMapLoaded"
      @featureHovered="handleFeatureHovered"
    ></mb-map>
    <map-legend></map-legend>
    <map-sidebar></map-sidebar>
  </div>
</template>

<script>
import _ from "lodash";

import MbMap from "@/components/MbMap";
import MapLegend from "@/components/MapLegend";
import MapSidebar from "@/components/MapSidebar";

import geographies from "@/assets/geographies";

export default {
  name: "MapDashboard",
  components: {
    MapLegend,
    MbMap,
    MapSidebar
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
    }
  },
  data: function() {
    return {
      hoveredFeature: {}
    };
  },
  methods: {
    handleMapLoaded: function() {
      if (process.env.NODE_ENV == "production") {
        _.delay(() => this.$store.dispatch("mapLoaded"), 250);
      }
    },
    handleFeatureHovered(feature) {
      this.hoveredFeature = feature;
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
  },
  watch: {
    activeGeographyId: {
      handler: function(curr, prev) {
        // change active data to be represented in current geography
        // remove layers of old geography
        // add layers of current geography with current data
      }
    }
  }
};
</script>

<style lang="scss"></style>
