<template>
  <li
    class="layer-group"
    :class="{ 'layer-group--expanded': expanded }"
    @mouseenter="handleLayerGroupHover"
    @mouseleave="handleLayerGroupHover"
  >
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
import _ from "lodash";

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
      expanded: false,
      timeoutId: undefined
    };
  },
  methods: {
    handleLayerGroupHover(e) {
      if (e.type == "mouseenter") {
        if (this.timeoutId !== undefined) {
          window.clearTimeout(this.timeoutId);
          this.timeoutId = undefined;
        }
        this.expanded = true;
      } else if (e.type == "mouseleave") {
        this.timeoutId = _.delay(() => (this.expanded = false), 2000);
      }
    },
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
  max-height: 1.5rem;
  margin-right: 15px;
  overflow: hidden;

  background: $light-orange;
  transition: all 1000ms ease-out;

  pointer-events: auto;

  border: 2px solid $dark-grey;
  border-top: 0;
  border-radius: 0 0 3px 3px;
}

.layer-group:first-of-type {
  margin-left: 15px;
}
.layer-group--expanded {
  max-height: 30rem;
  transition: all 1000ms ease-out;
}
.layer-group--expanded > .layer-group__title {
  // height: 100%;
}

.layer-group__title {
  border: 0 solid $dark-grey;
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
