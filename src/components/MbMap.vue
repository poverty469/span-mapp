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
      this.addGeoJsonLayer(legislativeLayer);

      this.addHoverPopUps(legislativeLayer);
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
     * @param {String} id The name id to associate with the layer.
     * @param {Geojson} data The GeoJson source for the layer.
     */
    addGeoJsonLayer(layer) {
      let layerSourceId = layer.id + "-source";
      // Add geojson source
      this.map.addSource(layerSourceId, {
        type: "geojson",
        data: layer.geometry
      });

      // Add polygon layer
      this.map.addLayer({
        id: layer.id,
        type: "fill",
        source: layerSourceId,
        paint: {
          "fill-color": "rgb(220, 174, 96)",
          "fill-opacity": 0.6
        }
      });

      // Add outline layer
      this.map.addLayer({
        id: layer.id + "-lines",
        type: "line",
        source: layerSourceId,
        paint: {
          "line-color": "rgb(139, 103, 41)",
          "line-width": 2
        }
      });

      this.activeLayer = layer;
    },

    addHoverPopUps(layer) {
      this.popUp = new mb.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 10,
        className: "mapboxgl-popup"
      });

      this.map.on("mousemove", layer.id, e => {
        const props = e.features[0].properties;
        this.map.getCanvas().style.cursor = "pointer";

        this.popUp
          .setLngLat(e.lngLat)
          .setHTML(`<p>${props.name}</p>`)
          .addTo(this.map);
      });

      this.map.on("mouseleave", layer.id, e => {
        this.map.getCanvas().style.cursor = "";
        this.popUp.remove();
      });
    },

    showPopup() {},

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
</style>
