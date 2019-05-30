<template>
  <li class="layer-group" :class="{ 'layer-group--expanded': expanded }">
    <div class="action-button__container layer-group__title">
      <a
        href="#"
        aria-haspopup="true"
        aria-expanded="false"
        @click="handleLayerGroupClick"
      >
        <div class="action-button__text">
          {{ title }}
        </div>
      </a>
      <ul class="layer-group__menu">
        <layer-menu-item
          v-for="(layer, index) in layers"
          :key="`${title}-menu-item-${index}`"
          v-bind="layer"
          @layerMenuItemClick="handleLayerMenuItemClick"
        ></layer-menu-item>
      </ul>
    </div>
  </li>
</template>
<script>
import LayerMenuItem from "@/components/LayerMenuItem";

export default {
  name: "LayerGroup",
  components: { LayerMenuItem },
  props: {
    title: {
      type: String,
      required: true
    },
    layers: {
      type: Array,
      required: true,
      default: function() {
        return [
          { title: "Test One" },
          { title: "Test Two" },
          { title: "Test Three" }
        ];
      }
    }
  },
  data: function() {
    return {
      expanded: false
    };
  },
  methods: {
    handleLayerGroupClick() {
      this.expanded = !this.expanded;
    },
    handleLayerMenuItemClick(layerTitle) {
      this.$emit("toggleLayer", layerTitle);
    }
  }
};
</script>
<style lang="scss">
.layer-group {
  display: inline-block;
  height: fit-content;
  margin-right: 15px;
  overflow: hidden;

  background: $light-orange;
  transition: height 1000ms ease-out;
}

.layer-group:first-of-type {
  margin-left: 15px;
}
.layer-group--expanded {
  overflow: visible;
}
.layer-group--expanded > .layer-group__title {
  height: 100%;
  transition: height 1000ms ease-out;
}

.layer-group__title {
  overflow: hidden;
  height: 1.5rem;
  border-color: $dark-grey;
}
.layer-group__title > * > .action-button__text {
  color: $dark-grey !important;
}
.layer-group--expanded > .layer-group__title:hover {
  background: $light-orange;
}

.layer-group__menu {
  margin: 10px 25px;
}
</style>
