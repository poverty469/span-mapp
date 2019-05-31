<template>
  <ul :v-if="layerGroups > 0" class="the-layer-panel">
    <layer-group
      v-for="(layerGroup, index) in INITIATIVES"
      :key="`layer-group-${layerGroup.title}-${index}`"
      :title="layerGroup.title"
      :layers="layerGroup.layers"
      @showLayer="handleShowLayer"
      @hideLayer="handleHideLayer"
    >
    </layer-group>
  </ul>
</template>
<script>
import LayerGroup from "@/components/LayerGroup";
import { INITIATIVES } from "@/assets/data/initiatives.js";

export default {
  name: "TheLayerPanel",
  components: { LayerGroup },
  data: function() {
    return {
      INITIATIVES: INITIATIVES
    };
  },
  methods: {
    handleToggleLayer(layerTitle) {
      this.$emit("toggleLayer", layerTitle);
    },
    handleShowLayer(layer) {
      this.$emit("showLayer", layer);
    },
    handleHideLayer(layer) {
      this.$emit("hideLayer", layer);
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
