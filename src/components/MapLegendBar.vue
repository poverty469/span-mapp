<template>
  <section class="map__legends-bar">
    <map-legend
      v-for="(layer, index) in layers"
      :key="`map-legend-${index}`"
      :title="getLayerTitle(layer)"
      :legendItems="getLegendItems(layer)"
      :style="{ order: layers.length - index }"
    ></map-legend>
  </section>
</template>
<script>
import MapLegend from "@/components/MapLegend";
import JsonQuery from "@/util/JsonColumnArrayQuery.js";
import { CustomPalette } from "@/util/CustomPalette";

export default {
  name: "MapLegendBar",
  components: {
    MapLegend
  },
  props: {
    layers: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    }
  },
  watch: {
    layers: {
      handler: function() {
        this.$nextTick(() => {
          this.$el.scrollTop = this.$el.scrollHeight - this.$el.clientHeight;
        });
      }
    }
  },
  methods: {
    // TODO: move data logic outside, internal should be straight forward
    getLayerTitle(layer) {
      return this.getDataPackage(layer)[layer.attributeId].title;
    },
    // TODO: each layer should be a class isntance, with this as a method e.g.
    getDataPackage(layer) {
      return layer.dataset.geographies[layer.geographyId];
    },
    getLegendItems(layer) {
      const layerQuery = new JsonQuery(this.getDataPackage(layer));
      // bind results to mapSupport, if map uses different class breaks, this breaks b/c
      // it will automatically get quantile class breaks
      const { classBreaks, stats } = layerQuery.getColumnSummary(
        layer.attributeId
      );
      const classLabels = this.getClassLabels(classBreaks, stats);
      const colors = this.getLayerPalette(layer.color, classBreaks.length);
      return classLabels.map((label, index) => {
        return {
          label,
          swatch: `#${colors[index]}`
        };
      });
    },
    getLayerPalette(colorName, classBreakCount) {
      return CustomPalette(colorName, classBreakCount);
    },
    getClassLabels(classBreaks, { MIN }) {
      if (typeof MIN == String) {
        MIN = parseFloat(MIN).toFixed(1);
      }
      const labelDelimiter = ";";

      return classBreaks
        .reduce((labels, breakPoint, index) => {
          if (index !== classBreaks.length - 1) {
            breakPoint = breakPoint.toFixed(1);
            labels += (breakPoint - 0.1).toFixed(1);
            labels += labelDelimiter;
            labels += breakPoint + " - ";
          } else {
            labels += breakPoint.toFixed(1);
          }

          return labels;
        }, `${MIN} - `)
        .split(labelDelimiter);
    }
  }
};
</script>
<style lang="scss" scoped>
$legends-bar-margin: 10px;

.map__legends-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  margin: 0 $legends-bar-margin 0 0;
  margin-left: 5px; // Add padding-left and width together
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-left: 5px;

  direction: rtl;
}

/* width */
.map__legends-bar::-webkit-scrollbar {
  width: 4px;
}

/* Track */
.map__legends-bar::-webkit-scrollbar-track {
  border-radius: 0px; // 10
}

/* Handle */
.map__legends-bar::-webkit-scrollbar-thumb {
  background: $dark-grey;
  border-radius: 0px; // 10
}

.map__legends-bar > * {
  margin-bottom: 0.8rem;
  direction: ltr;
}

.map__legends-bar > *:last-of-type {
  // First and last are swapped because of reversed flex ordering
  // margin-top: 28px;
  margin-top: auto;
  padding-top: 28px;
}

.map__legends-bar > *:first-of-type {
  margin-bottom: 28px;
}

.map__legends-bar > *:first-of-type:last-of-type {
  margin-top: auto;
}
</style>
