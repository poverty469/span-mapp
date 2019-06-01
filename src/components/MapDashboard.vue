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
    <the-layer-panel
      v-show="!bare"
      @showLayer="handleShowLayer"
      @hideLayer="handleHideLayer"
    ></the-layer-panel>
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
import TheLayerPanel from "@/components/TheLayerPanel";

import { Layers } from "@/assets/data/Layers";

export default {
  name: "MapDashboard",
  components: {
    MapLegendBar,
    MbMap,
    InfoBar,
    TheLayerPanel
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
      activeData: [],
      hoveredFeature: {},
      mapPadding: {
        top: 50,
        right: 50 + 10, // + 50 padding + 10 px to accomodate right shift into info bar
        bottom: 25,
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
    },
    handleShowLayer(layer) {
      this.activeData.push(layer);
    },
    handleHideLayer(layer) {
      this.activeData = this.activeData.filter(
        activeLayer =>
          activeLayer.title !== layer.title &&
          activeLayer.attributeId !== layer.attributeId
      );
    },
    handleToggleLayer(toggledLayer) {
      let indexOfToggledLayer = this.activeData.indexOf(
        layer => layer.title === toggledLayer.title
      );

      if (indexOfToggledLayer > -1) {
        // If not an active layer
        this.activeData.push(Layers[indexOfToggledLayer]);
      } else {
        this.activeData.splice(indexOfToggledLayer, 1); // Removes from list
      }
      // TODO: add or remove the layer associated with the title from the active data list
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
}

.map-dashboard__map--expanded {
  transition: all 250ms ease-out;
  width: calc(#{$map-width});
}

.map-dashboard__info-bar {
  width: $righter-width;
}

.mapboxgl-ctrl-bottom-right .mapboxgl-ctrl {
  margin-right: 36px; // Arbitrary for visual proportions
  text-align: right;
}

.mapboxgl-ctrl-top-right {
  right: 28px;
}

.mapboxgl-ctrl-scale {
  user-select: none;
}

.mapboxgl-ctrl-top-right .mapboxgl-ctrl {
  background: transparent;
}

.mapboxgl-ctrl-top-right .mapboxgl-ctrl:hover {
  background: white;
}

/* Mapbox styling */
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
