<template>
  <div>
    <mb-map
      :mapId="mapId"
      :activeData="activeData"
      :activeGeographyKey="activeGeographyKey"
    ></mb-map>
    <map-legend></map-legend>
    <map-sidebar></map-sidebar>
  </div>
</template>

<script>
import MbMap from "@/components/MbMap";
import MapLegend from "@/components/MapLegend";
import MapSidebar from "@/components/MapSidebar";

import geographies from "@/assets/geographies";
import povertyData from "@/../mock-data/dataLayer";

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
      }
    }
  },
  data: function() {
    return {
      // The currently active data layers on the map
      // activeLayers: [],
      activeGeographyKey: geographies.districts.id
    };
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
    }
  }
};
</script>

<style lang="scss"></style>
