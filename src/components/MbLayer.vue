<template></template>

<script>
import _ from "lodash";
import mb from "mapbox-gl";

import { MapTypes, SequentialPalettes } from "@/util/enums.js";
import MapSupport from "@/util/mapSupport";

export default {
  name: "MbLayer",
  components: {},
  props: {
    map: { type: Object, required: true },
    dataset: { type: Object, required: true },
    geographyId: { type: String, required: true },
    attributeId: { type: String, required: true },
    type: { type: String, required: true },
    color: {
      type: String,
      required: false,
      default: SequentialPalettes.PURPLE
    },
    options: {
      type: Object,
      required: false,
      default: function() {
        return {
          popUp: true,
          hoverEffect: true,
          fillColor: "rgb(220, 174, 96)"
        };
      }
    }
  },
  data: function() {
    return {
      hoveredFeature: undefined
    };
  },
  methods: {
    addLayerToMap() {
      let layerId = this.layerId;
      // Add polygon layer
      this.map.addLayer({
        id: layerId, // TODO: make unique layer ids for multiple usages of same source
        type: "fill",
        source: this.geographyId,
        paint: {
          "fill-color": this.fillColor,
          // A conditional that changes opacity when the feature-state changes
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.5,
            1
          ]
        }
      });

      // Add outline layer
      this.map.addLayer({
        id: this.outlineId,
        type: "line",
        source: this.geographyId,
        paint: {
          "line-color": "rgb(139, 103, 41)",
          "line-width": 2
        }
      });

      this.options.hoverEffect ? this.addHoverPopUps(layerId) : null;
      this.options.popUp ? this.addHoverEffect(layerId) : null;
    },
    /**
     * Removes the provided layer from the map.
     * @param {Object} layer A map layer.
     */
    removeLayerFromMap() {
      this.map.removeLayer(this.layerId);
      this.map.removeLayer(this.outlineId);
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
        this.handleHoverOverFeature(hoveredFeature);

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
            `
            <h2 class="popup--race__title">
              ${hoveredFeature.properties.NAMELSAD}
            </h2>
            <h3 class="popup--race__title">
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
    handleHoverOverFeature(feature) {
      if (
        _.isNil(this.hoveredFeature) ||
        _.isNil(feature) ||
        feature.id !== this.hoveredFeature.id
      ) {
        console.log(feature, this.hoveredFeature);
        this.hoveredFeature = feature;
        this.$emit("featureHovered", feature);
      }
    }
  },
  computed: {
    layerId: function() {
      return `${this.dataset.id}_${this.geographyId}_${this.attributeId}`;
    },
    outlineId: function() {
      return this.layerId + "-outline";
    },
    fillColor: function() {
      return this.type == MapTypes.CHOROPLETH
        ? MapSupport.getChoroplethExpression(
            this.dataset.geographies[this.geographyId],
            this.attributeId,
            this.color
          )
        : this.options.fillColor;
    }
  },
  mounted: function() {
    this.addLayerToMap();
  },
  beforeDestroy: function() {
    this.removeLayerFromMap();
  }
};
</script>
<style lang="scss" scoped></style>
