<template>
  <ul>
    <main-menu-item
      v-for="(item, index) of menuItems"
      :key="`main-menu-item-${index}`"
      :menuItem="item"
      class="menu-item"
      :class="{ 'menu-item--active': activeMainMenuItemIndex == index }"
    ></main-menu-item>
  </ul>
</template>

<script>
import MainMenuItem from "@/components/MainMenuItem.vue";
import menuItems from "@/util/menuItems.js";
import { mapGetters } from "vuex";

export default {
  name: "TheMainMenu",
  components: { MainMenuItem },
  props: {},
  data: function() {
    return {
      menuItems: menuItems
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["activeMainMenuItemIndex"])
  }
};
</script>

<style lang="scss">
.menu-item {
  display: inline-block;
  height: 100%;
  overflow: hidden;
  text-decoration: none;
}

.menu-item--active {
  background-color: $light-orange;
}

.menu-item:hover {
  background-color: $dark-orange;
}

.menu-item:active {
  background-color: $dark-orange--shadow;
}
</style>
