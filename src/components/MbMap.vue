<template>
  <div class="map-container">
    <div :id="mapId" class="map"></div>
  </div>
</template>

<script>
import mb from "mapbox-gl";
import boundsEnum from "@/../mock-data/bounds";
import legislativeLayer from "@/../mock-data/layer";

export default {
  name: "MbMap",
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
      map: undefined
    };
  },
  mounted: function() {
    mb.accessToken = process.env.VUE_APP_MAPBOX_API_ACCESS_TOKEN;
    this.map = new mb.Map({
      container: this.mapId,
      style:
        // Set basemap to Stamen during development and to mapbox during production
        process.env.NODE_ENV == "development"
          ? {
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
            }
          : process.env.VUE_APP_MAPBOX_STYLE_URL,
      bounds: new mb.LngLatBounds(
        boundsEnum.washington.sw,
        boundsEnum.washington.ne
      ),
      fitBoundsOptions: {
        padding: this.$store.getters.mapFocusPadding
      }
    });

    this.map.on("load", () => {
      this.addGeoJsonLayer("districts", legislativeLayer.geometry);
    });
  },
  methods: {
    /**
     * Zooms to the provided bounding box corners.
     * @param {Object} corners The boundind box vertices coordinates.
     * @property {array<number>} sw The southwest vertex coordinates.
     * @property {array<number>} ne The northeast vertex coordinates.
     */
    zoomToBounds: function({ sw, ne }) {
      let bounds = new mb.LngLatBounds(sw, ne);
      this.map.fitBounds(bounds, {
        padding: this.$store.getters.mapFocusPadding
      });
    },

    /**
     * Adds the given geojson data as a layer to the map.
     * @param {String} id The name id to associate with the layer.
     * @param {Geojson} data The GeoJson source for the layer.
     */
    addGeoJsonLayer(id, data) {
      // Add geojson source
      this.map.addSource(id, {
        type: "geojson",
        data: data
      });

      // Add polygon layer
      this.map.addLayer({
        id: id + "-polygons",
        type: "fill",
        source: id,
        paint: {
          "fill-color": "rgb(220, 174, 96)",
          "fill-opacity": 0.6
        }
      });

      // Add outline layer
      this.map.addLayer({
        id: id + "-lines",
        type: "line",
        source: id,
        paint: {
          "line-color": "rgb(139, 103, 41)",
          "line-width": 2
        }
      });
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
