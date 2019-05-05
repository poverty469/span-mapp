<template>
  <div class="map-container">
    <pop-up :map="map"></pop-up>
    <div :id="mapId" class="map"></div>
  </div>
</template>

<script>
import mb from "mapbox-gl";
import _ from "lodash";

import boundsEnum from "@/../mock-data/bounds";
import legislativeLayer from "@/../mock-data/layer";

import PopUp from "@/components/PopUp.vue";

export default {
  name: "MbMap",
  components: {
    PopUp
  },
  props: {
    mapId: {
      type: String,
      required: true,
      validator: function(val) {
        return !val.includes(" ");
      }
    }
  },
  data: function() {
    return {
      map: undefined,
      activeLayer: undefined,
      popUp: undefined
    };
  },
  mounted: function() {
    mb.accessToken = process.env.VUE_APP_MAPBOX_API_ACCESS_TOKEN;
    this.map = new mb.Map({
      container: this.mapId,
      style: this.getBaseMap(),
      bounds: new mb.LngLatBounds(
        boundsEnum.washington.sw,
        boundsEnum.washington.ne
      ),
      fitBoundsOptions: {
        padding: this.$store.getters.mapFocusPadding
      }
    });

    /* LISTENERS */
    // When map is loaded, add the initial layer
    this.map.on("load", () => {
      this.addGeoJsonLayer(legislativeLayer, "test");
    });

    // Handle the window resize event once per resize interaction
    window.addEventListener("resize", _.debounce(this.handleWindowResize, 150));
  },
  methods: {
    /**
     * Zooms to the provided bounding box corners.
     * @param {Object} corners The boundind box vertices coordinates.
     * @property {array<number>} sw The southwest vertex coordinates.
     * @property {array<number>} ne The northeast vertex coordinates.
     */
    zoomToBounds({ sw, ne }) {
      this.map.fitBounds([sw, ne], {
        padding: this.$store.getters.mapFocusPadding
      });
    },

    /**
     * Handles the window resize event.
     * Zooms the map to the active layer bounds.
     */
    handleWindowResize() {
      // TODO: If user did not adjust zoom or pan, resize map. When map is adjusted reveal recenter button
      // Debounce prevents the map adjusting during the active resizing
      if (this.activeLayer !== undefined) {
        this.zoomToBounds(this.activeLayer.boundingBox);
      }
    },

    /**
     * Adds the given geojson data as a layer to the map.
     * @param {String} sourceLayer The source geojson layer.
     * @param {Geojson} layerId The id for the layer being added.
     * @param {boolean} addHover Whether or not to add a hover effect.
     * @param {boolean} addPopup Whether or not to add a popup on hover.
     */
    addGeoJsonLayer(sourceLayer, layerId, addHover = true, addPopup = true) {
      let layerSourceId = sourceLayer.id;
      // Add geojson source
      this.map.addSource(layerSourceId, {
        type: "geojson",
        data: sourceLayer.geometry
      });

      // Add polygon layer
      this.map.addLayer({
        id: layerId, // TODO: make unique layer ids for multiple usages of same source
        type: "fill",
        source: sourceLayer.id,
        paint: {
          "fill-color": "rgb(220, 174, 96)",
          // A conditional that changes opacity when the feature-state changes
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.6
          ]
        }
      });

      // Add outline layer
      this.map.addLayer({
        id: layerId + "-outline",
        type: "line",
        source: sourceLayer.id,
        paint: {
          "line-color": "rgb(139, 103, 41)",
          "line-width": 2
        }
      });

      addHover ? this.addHoverPopUps(sourceLayer, layerId) : null;
      addPopup ? this.addHoverEffect(layerId) : null;

      this.activeLayer = sourceLayer;
    },

    /**
     * Adds a hover effect to the data layer associated with the given layer id.
     * @param {String} layerId The id of a data layer.
     */
    addHoverEffect(layerId) {
      let hoveredFeature = null;

      this.map.on("mousemove", layerId, e => {
        this.map.getCanvas().style.cursor = "crosshair";

        // Turn off hover effect on former feature
        if (hoveredFeature) {
          this.map.setFeatureState(
            {
              id: hoveredFeature.id,
              source: hoveredFeature.source
            },
            {
              hover: false
            }
          );
        }

        hoveredFeature = e.features[0]; // Update hovered feature

        // Turn on hover effect on former feature
        this.map.setFeatureState(
          {
            id: hoveredFeature.id,
            source: hoveredFeature.source
          },
          {
            hover: true
          }
        );
      });

      // Turn off hover remaining effect when no longer hovering over layer
      this.map.on("mouseleave", layerId, e => {
        this.map.getCanvas().style.cursor = "";
        if (hoveredFeature) {
          this.map.setFeatureState(
            {
              source: hoveredFeature.source,
              id: hoveredFeature.id
            },
            {
              hover: false
            }
          );
        }
        hoveredFeature = null;
      });
    },

    /**
     * Adds a popup on hover for the data layer associated with the given layer id.
     * @param {Object} sourceLayer Geojson source for the given layer.
     * @param {String} layerId The id of a data layer
     */
    // TODO: find better solution for popup html, don't use source layer plz?
    addHoverPopUps(sourceLayer, layerId) {
      this.popUp = new mb.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 10,
        className: "mapboxgl-popup"
      });

      let hoveredFeature;

      this.map.on("mousemove", layerId, e => {
        hoveredFeature = e.features[0]; // Update hovered feature
        this.map.getCanvas().style.cursor = "crosshair";

        this.popUp
          .setLngLat(e.lngLat)
          .setHTML(sourceLayer.popUpHtml(hoveredFeature))
          .addTo(this.map);
      });

      this.map.on("mouseleave", layerId, e => {
        this.map.getCanvas().style.cursor = "";
        this.popUp.remove();
      });
    },

    /**
     * Returns a Stamen raster basemap during development, or a mapbox vector basemap
     * during production.
     * @return {Object} Raster basemap object.
     * @return {String} Mapbox style URL.
     */
    getBaseMap() {
      if (process.env.NODE_ENV == "development") {
        return {
          version: 8,
          sources: {
            "simple-tiles": {
              type: "raster",
              tiles: ["http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png"],
              tileSize: 256
            }
          },
          layers: [
            {
              id: "simple-tiles",
              type: "raster",
              source: "simple-tiles",
              minzoom: 0,
              maxzoom: 22
            }
          ]
        };
      } else {
        return process.env.VUE_APP_MAPBOX_STYLE_URL;
      }
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
