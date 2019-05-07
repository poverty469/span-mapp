<template>
  <div class="map-container">
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
      }
    },
    activeGeography: {
      type: Object
    }
  },
  data: function() {
    return {
      map: undefined, // The mapbox map
      activeLayers: []
    };
  },
  computed: {
    activeGeographyId() {
      return this.activeGeography.id;
    },
    boundsOfAllLayers() {
      // TODO: FIND THE MIN AND MAX COORDINATES OF ALL ACTIVE LAYERS
      return geographies.washington.bounds;
    }
  },
  watch: {
    activeData: {
      handler: function(currentData) {
        this.updateDrawnLayers(currentData);
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
      _.delay(() => this.$store.dispatch("mapLoaded"), 250); // Delay to hide loading of layer
    });
  },
  methods: {
    /**
     * Creates a map with an initial state.
     */
    createMap() {
      mb.accessToken = process.env.VUE_APP_MAPBOX_API_ACCESS_TOKEN;

      this.map = new mb.Map({
        container: this.mapId,
        style: this.getBaseMap(),
        bounds: geographies.washington.bounds,
        fitBoundsOptions: {
          padding: this.$store.getters.mapFocusPadding
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

      // Add attribution button
      this.map.addControl(
        new mb.AttributionControl({
          compact: true
        })
      );
    },
    /**
     * Adds the interaction controls to the map.
     */
    addControls() {
      this.map.addControl(
        new mb.ScaleControl({
          maxWidth: 80,
          unit: "imperial"
        })
      );

      this.map.addControl(
        new mb.NavigationControl({
          showCompass: false
        })
      );
    },
    /**
     * Updates the map layers to match the provided layer list.
     * Draws new layers and removes active layers not present in the list.
     * @param {Array[Object]} newData List of data to be drawn.
     */
    updateDrawnLayers(newData) {
      let diff = _.xorWith(this.activeLayers, newData, (arrVal, othVal) => {
        return arrVal.id === othVal.id;
      });

      for (let layer of diff) {
        let found = newData.includes(layer);
        if (found) {
          this.addLayer(layer);
        } else if (!found && layer !== undefined && layer !== null) {
          this.removeLayer(layer);
        }
      }
    },
    /**
     * Returns a unique layer id based off of the given layer.
     * @param {Object} layer A map layer.
     * @return {String} The layer id.
     */
    getLayerId(layer) {
      // TODO: might be better to keep track of current mapbox layers and reference them, rather than
      // relying on the correctness of the activeGeography
      return `${layer.id}-${this.activeGeographyId}`;
    },
    /**
     * Returns a unique layer id for outlines based off of the given layer.
     * @param {Object} layer A map layer.
     * @return {String} The outline layer id.
     */
    getOutlineId(layer) {
      return this.getLayerId(layer) + "-outline";
    },
    /**
     * Removes the provided layer from the map.
     * @param {Object} layer A map layer.
     */
    removeLayer(layer) {
      this.activeLayers = this.activeLayers.filter(activeLayer => {
        return activeLayer.id !== layer.id;
      });
      this.map.removeLayer(this.getLayerId(layer));
      this.map.removeLayer(this.getOutlineId(layer));
    },
    /**
     * Adds the given geojson data as a layer to the map.
     * @param {Object} layer A map layer.
     * @param {boolean} addHover Whether or not to add a hover effect.
     * @param {boolean} addPopup Whether or not to add a popup on hover.
     */
    addLayer(layer, addHover = true, addPopup = true) {
      this.activeLayers.push(layer);

      let layerId = this.getLayerId(layer);
      // Add polygon layer
      this.activeLayer = this.map.addLayer({
        id: layerId, // TODO: make unique layer ids for multiple usages of same source
        type: "fill",
        source: this.activeGeographyId,
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
        id: this.getOutlineId(layer),
        type: "line",
        source: this.activeGeographyId,
        paint: {
          "line-color": "rgb(139, 103, 41)",
          "line-width": 2
        }
      });

      addHover ? this.addHoverPopUps(layerId) : null;
      addPopup ? this.addHoverEffect(layerId) : null;
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
        padding: this.$store.getters.mapFocusPadding
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
    /**
     * Adds the given geojson data as a layer to the map.
     * @param {Object} geography A type of geography.
     * @param {Geojson} layerId The id for the layer being added.
     * @param {boolean} addHover Whether or not to add a hover effect.
     * @param {boolean} addPopup Whether or not to add a popup on hover.
     */
    addPolygonDataLayer(geography, layerId, addHover = true, addPopup = true) {
      // Add polygon layer
      this.activeLayer = this.map.addLayer({
        id: layerId, // TODO: make unique layer ids for multiple usages of same source
        type: "fill",
        source: geography.id,
        paint: {
          "fill-color": "rgb(220, 174, 96)",
          "fill-opacity": [
            "case", // A conditional that changes opacity when the feature-state changes
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
