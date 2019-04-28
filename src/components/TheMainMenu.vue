<template>
  <ul>
    <menu-item
      v-for="(item, index) of menuItems"
      :key="index"
      :item="item"
      class="menu-item"
    ></menu-item>
  </ul>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  name: "TheMainMenu",
  props: {},
  data: function() {
    return {
      menuItems: [
        {
          title: "map",
          path: "#",
          description: ""
        },
        {
          title: "stories",
          path: "#",
          description: ""
        },
        {
          title: "tour",
          path: "#",
          description: ""
        },
        {
          title: "about",
          path: "#",
          description: ""
        },
        {
          title: "faq",
          path: "#",
          description: ""
        }
      ]
    };
  },
  components: { MenuItem }
};
</script>

<style lang="scss">
.menu-item {
  display: inline-block;
  height: 100%;
}
</style>
