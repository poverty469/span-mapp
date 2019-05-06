<template>
  <div class="map-container">
    <!--pop-up :map="map"></pop-up-->
    <div :id="mapId" class="map"></div>
  </div>
</template>

<script>
import mb from "mapbox-gl";
import _ from "lodash";

import geographies from "@/assets/geographies";

export default {
  name: "MbMap",
  components: {},
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
      map: undefined, // The mapbox map
      activeLayer: undefined, // The currently active layer
      popUp: undefined
    };
  },
  mounted: function() {
    mb.accessToken = process.env.VUE_APP_MAPBOX_API_ACCESS_TOKEN;
    this.map = new mb.Map({
      container: this.mapId,
      style: this.getBaseMap(),
      bounds: geographies.washington.bounds,
      fitBoundsOptions: {
        padding: this.$store.getters.mapFocusPadding
      }
    });

    /* LISTENERS */
    // Handle the window resize event once per resize interaction
    window.addEventListener("resize", _.debounce(this.handleWindowResize, 150));

    // Add/ show initial layer,
    this.map.on("load", () => {
      this.initializeLayerSources();
      this.addGeoJsonDataLayer(geographies.districts, "test");
      _.delay(() => this.$store.dispatch("mapLoaded"), 250);
    });
  },
  methods: {
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
     * @param {Object} corners The boundind box vertices coordinates.
     * @property {array<number>} sw The southwest vertex coordinates.
     * @property {array<number>} ne The northeast vertex coordinates.
     */
    zoomToBounds(bounds) {
      this.map.fitBounds(bounds, {
        padding: this.$store.getters.mapFocusPadding
      });
    },

    /**
     * Handles the window resize event.
     * Zooms the map to the active layer bounds.
     */
    handleWindowResize() {
      // TODO: If user did not adjust zoom or pan, resize map. When map is adjusted reveal recenter button
      if (
        this.activeLayer !== undefined &&
        this.activeLayer.boundingBox !== undefined
      ) {
        this.zoomToBounds(this.activeLayer.boundingBox);
      } else {
        this.zoomToBounds(geographies.washington.bounds);
      }
    },

    /**
     * Adds the given geojson data as a layer to the map.
     * @param {String} sourceLayer The source geojson layer.
     * @param {String} sourceLayerId The id for the source layer;
     * @param {Geojson} layerId The id for the layer being added.
     * @param {boolean} addHover Whether or not to add a hover effect.
     * @param {boolean} addPopup Whether or not to add a popup on hover.
     */
    addGeoJsonDataLayer(geography, layerId, addHover = true, addPopup = true) {
      // Add polygon layer
      this.activeLayer = this.map.addLayer({
        id: layerId, // TODO: make unique layer ids for multiple usages of same source
        type: "fill",
        source: geography.id,
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
        source: geography.id,
        paint: {
          "line-color": "rgb(139, 103, 41)",
          "line-width": 2
        }
      });

      addHover ? this.addHoverPopUps(layerId) : null;
      addPopup ? this.addHoverEffect(layerId) : null;
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
     * @param {String} layerId The id of a data layer
     */
    // TODO: find better solution for popup html, don't use source layer plz?
    addHoverPopUps(layerId) {
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
          .setHTML(
            `<h3 class="popup--race__title">
              ${hoveredFeature.properties.name}
            </h3>
            <p class="popup--race__text">
              ${hoveredFeature.properties.subtitle}
            </p>`
          )
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
