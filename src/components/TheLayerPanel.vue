<template>
  <ul class="the-layer-panel">
    <layer-group
      v-for="(layerGroup, index) in layerGroups"
      :key="`layer-group-${index}`"
      v-bind="layerGroup"
      @toggleLayer="handleToggleLayer"
    >
    </layer-group>
  </ul>
</template>
<script>
import LayerGroup from "@/components/LayerGroup";
import { MapTypes, SequentialPalettes } from "@/util/enums.js";
import geographies from "@/assets/geographies";
import povertyData from "@/assets/data/dataLayer";

export default {
  name: "TheLayerPanel",
  components: { LayerGroup },
  data: function() {
    return {
      layerGroups: [
        { title: "basic needs", layers: [
          { 
            name: "Families in Poverty", 
            dataset: povertyData,
            geographyId: geographies.counties.id,
            attributeId: "HC03_VC161",
            type: MapTypes.CHOROPLETH,
            color: SequentialPalettes.RED_PURPLE
         },
         {
           name: "Married Couples in Poverty",
           dataset: povertyData,
           geographyId: geographies.counties.id,
           attributeId: "HC03_VC164",
           type: MapTypes.CHOROPLETH,
           color: SequentialPalettes.BLUE
         }]
        },
        /* {
          title: "criminal justice",
          layers: [
            { name: "cj One" },
            { name: "cj One" },
            { name: "cj One" }
          ]
        },
        {
          title: "state revenue",
          layers: [{ name: "bn One" }, { name: "cj One" }]
        }, */
        { title: "consumer protection", layers: [
          { 
            name: "Median Income", 
            dataset: povertyData,
            geographyId: geographies.counties.id,
            attributeId: "HC03_VC178",
            type: MapTypes.CHOROPLETH,
            color: SequentialPalettes.ORANGE_RED
          },
          { 
            name: "Family Income", 
            dataset: povertyData,
            geographyId: geographies.counties.id,
            attributeId: "HC03_VC162",
            type: MapTypes.CHOROPLETH,
            color: SequentialPalettes.PURPLE_BLUE
          }]
        }
      ]
    };
  },
  methods: {
    handleToggleLayer(layerTitle) {
      for (let element of this.layerGroups) {
        for (let entry of element.layers) {
          if(entry.name === layerTitle) {
            this.$emit("toggleLayer", entry);
            break;
          }
        }
      }
    }
  }
};
</script>
<style lang="scss">
.the-layer-panel {
  position: absolute;
  left: 0;
  top: 0;
  flex-wrap: nowrap;
  display: flex;
  align-items: flex-start;
  pointer-events: none;
}
</style>
