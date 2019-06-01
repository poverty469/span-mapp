<template>
  <li
    class="layer-menu-item"
    :class="{ 'layer-menu-item--active': active }"
    @click="handleMenuItemClick"
  >
    {{ title }}
  </li>
</template>
<script>
export default {
  name: "LayerMenuItem",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      active: false
    };
  },
  methods: {
    handleMenuItemClick() {
      this.active = !this.active;
      this.$emit("layerMenuItemClick", this.active);
    }
  }
};
</script>
<style lang="scss">
.layer-menu-item {
  width: 75%;
  margin: 10px 0px;
  padding: 5px;

  box-shadow: 3px 3px 5px 0px $shadow;
  transition: all 150ms ease-out;
  background: $light-orange;
  border: $thin-border solid $dark-grey;

  @include char-style($layer-menu-item...);
  text-transform: capitalize;
  cursor: pointer;
}

.layer-menu-item:hover {
  background: $dark-orange;
  cursor: pointer;
}

.layer-menu-item--active {
  box-shadow: inset 2px 2px 5px $shadow;
  transition: all 150ms ease-out;
  background: $dark-orange;
}

.layer-menu-item--active:hover {
  background: $dark-orange--shadow;
}
</style>
