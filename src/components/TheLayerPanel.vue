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

export default {
  name: "TheLayerPanel",
  components: { LayerGroup },
  data: function() {
    return {
      layerGroups: [
        { title: "basic needs", layers: [{ title: "bn One" }] },
        {
          title: "criminal justice",
          layers: [
            { title: "cj One" },
            { title: "cj One" },
            { title: "cj One" }
          ]
        },
        {
          title: "state revenue",
          layers: [{ title: "bn One" }, { title: "cj One" }]
        },
        { title: "consumer protection", layers: [{ title: "bn One" }] }
      ]
    };
  },
  methods: {
    handleToggleLayer(layerTitle) {
      this.$emit("toggleLayer", layerTitle);
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
