<template>
  <div class="map-container">
    <div :id="mapId" class="map">
      <span v-for="(layer, index) in layers" :key="`${mapId}-layer-${index}`">
        <!-- <keep-alive> -->
        <mb-layer
          v-bind="layer"
          :active="isActive(layer)"
          :map="map"
          :mapLoaded="mapLoaded"
          @featureHovered="handleFeatureHovered"
        ></mb-layer>
        <!-- </keep-alive> -->
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import mb from "mapbox-gl";
import _ from "lodash";

import mbLayer from "@/components/MbLayer";

import mapSupport from "@/util/mapSupport";

import LAYER_OBJECT from "@/assets/data/Layers.js";

import geographies from "@/assets/geographies";

export default {
  name: "MbMap",
  components: { mbLayer },
  data: function() {
    return {
      map: {}, // The mapbox map
      activeLayers: [],
      layers: LAYER_OBJECT.LAYERLIST,
      mapControlsAdded: false,
      mapLoaded: false
    };
  },
  props: {
    mapId: {
      // Unique id for instance of map
      type: String,
      required: true,
      validator: function(val) {
        return !val.includes(" ");
      }
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
    },
    mapPadding: {
      type: Object,
      required: true
    }
  },
  computed: {
    boundsOfAllLayers() {
      // TODO: FIND THE MIN AND MAX COORDINATES OF ALL ACTIVE LAYERS
      return geographies.washington.bounds;
    }
  },
  watch: {
    bare: {
      handler: function(bare) {
        if (!this.mapControlsAdded && !bare) {
          this.addControls();
          this.mapControlsAdded = true;
        }
        // Make the map always reactive, e.g. slides when visiting /map
        _.delay(() => window.dispatchEvent(new Event("resize")), 50);
      }
    }
  },
  mounted: function() {
    this.createMap();

    // Handle the window resize event once per resize interaction
    window.addEventListener("resize", _.debounce(this.handleWindowResize, 150));

    // Add/ show initial layer
    this.map.on("load", () => {
      this.initializeLayerSources();
      this.addBlackOutlineLayer(geographies.washington, "splash-page");
      this.$emit("mapLoaded");
      this.mapLoaded = true;
    });
  },
  methods: {
    isActive(layer) {
      if (
        this.activeData.find(
          activeLayer =>
            activeLayer.title === layer.title &&
            activeLayer.attributeId === layer.attributeId
        ) === undefined
      ) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * Creates a map with an initial state.
     */
    createMap() {
      mb.accessToken = process.env.VUE_APP_MAPBOX_API_ACCESS_TOKEN;

      this.map = new mb.Map({
        container: this.mapId,
        style: mapSupport.getBaseMap(),
        bounds: geographies.washington.bounds,
        fitBoundsOptions: {
          padding: this.mapPadding
        },
        attributionControl: false,
        pitchWithRotate: false,
        minZoom: 5,
        maxZoom: 15,
        // TODO: make maxbounds at ends of line where center is washington centroid
        // TODO: This will center washington on zoom out
        maxBounds: [
          [-135.009469975438662, 40.415064061658647],
          [-107.721240134848074, 53.181822152409069]
        ]
      });
    },
    /**
     * Adds the interaction controls to the map.
     */
    addControls() {
      // Add attribution button
      this.map.addControl(
        new mb.AttributionControl({
          compact: true
        })
      );

      this.map.addControl(
        new mb.ScaleControl({
          maxWidth: 80,
          unit: "imperial"
        }),
        "bottom-right"
      );

      this.map.addControl(
        new mb.NavigationControl({
          showCompass: false
        }),
        "top-right"
      );
    },
    /**
     * Updates the map layers to match the provided layer list.
     * Draws new layers and removes active layers not present in the list.
     * @param {Array[Object]} newData List of data to be drawn, requires data property and optional geography property.
     */
    updateDrawnLayers(newData) {
      // Retrieve the difference between the current layers and the new layers
      let diff = _.xorWith(this.activeLayers, newData, (arrVal, othVal) => {
        if (_.isNil(arrVal.dataset) && _.isNil(othVal.dataset)) {
          return true;
        }

        // return false if one is an empty object and the other is not
        if (!(_.isEmpty(arrVal) && _.isEmpty(othVal))) {
          return false;
        }

        return (
          arrVal.dataset.id === othVal.dataset.id &&
          arrVal.geographyId === othVal.geographyId
        );
      });

      for (let layer of diff) {
        let found = newData.includes(layer);

        if (found) {
          if (layer.style === "choropleth") {
            this.addChoroplethLayer(layer);
          } else {
            this.addLayer(layer);
          }
        } else if (!found && !_.isNil(layer) && !_.isEmpty(layer)) {
          this.removeLayer(layer);
        }
      }
    },
    /**
     * Adds all essential geography geometries as map sources.
     */
    initializeLayerSources() {
      for (let geogName in geographies) {
        let geog = geographies[geogName];
        this.map.addSource(geog.id, {
          type: "geojson",
          data: geog.geometry,
          attribution: `${geog.source.title} ${geog.source.year}`,
          tolerance: 0.375
        });
      }
    },
    /**
     * Zooms to the provided bounding box corners.
     * @param {Array[Array[number]]} bounds A list of a box's southwest and northeast coordinates.
     */
    zoomToBounds(bounds) {
      this.map.fitBounds(bounds, {
        padding: this.mapPadding
      });
    },
    /**
     * Handles the window resize event.
     * Zooms the map to the active layer bounds.
     */
    handleWindowResize() {
      // TODO: If user did not adjust zoom or pan, resize map. When map is adjusted reveal recenter button
      let outerBounds = this.boundsOfAllLayers;
      if (this.activeLayers.length !== 0 && outerBounds !== undefined) {
        this.zoomToBounds(outerBounds);
      } else {
        this.zoomToBounds(geographies.washington.bounds);
      }
    },
    /**
     * Adds an outline layer to the map.
     * @param {Object} geography The id of the geography to be outlined.
     * @param {String} layerId A unique id for the outline layer.
     */
    addBlackOutlineLayer(geography, layerId) {
      // Add outline layer
      this.map.addLayer({
        id: layerId + "-outline",
        type: "line",
        source: geography.id,
        paint: {
          "line-color": "black",
          "line-width": 3
        }
      });
    },
    handleFeatureHovered(feature) {
      this.$emit("featureHovered", feature);
    }
  }
};
</script>

<style lang="scss">
.map,
.map-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: rgb(220, 174, 96);
}

.popup--race {
  font-size: 2rem;
}
</style>
