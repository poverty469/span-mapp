<template>
  <li
    class="layer-menu-item"
    :class="{ 'layer-menu-item--active': this.active == true }"
    @click="handleMenuItemClick"
  >
    {{ name }}
  </li>
</template>
<script>
export default {
  name: "LayerMenuItem",
  props: {
    name: {
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
      this.$emit("layerMenuItemClick", this.name);
    }
  }
};
</script>
<style lang="scss">
.layer-menu-item {
  margin: 10px 0px;
  padding: 5px;

  box-shadow: 3px 3px 5px 0px $shadow;
  transition: all 150ms ease-out;
  background: $light-orange;
  border: $thin-border solid $dark-grey;

  @include char-style($layer-menu-item...);
  text-transform: capitalize;
}

.layer-menu-item:hover {
  background: $dark-orange;
}

.layer-menu-item--active {
  box-shadow: 0px 0px 0px 0px $shadow;
  transition: all 150ms ease-out;
  background: $dark-orange;
}

.layer-menu-item--active:hover {
  background: $dark-orange--shadow;
}
</style>
