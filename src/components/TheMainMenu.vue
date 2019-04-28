<template>
  <ul>
    <main-menu-item v-for="(item, index) of menuItems" :key="index" :item="item" class="menu-item"></main-menu-item>
  </ul>
</template>

<script>
import MainMenuItem from "@/components/MainMenuItem.vue";

export default {
  name: "TheMainMenu",
  components: { MainMenuItem },
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
  }
};
</script>

<style lang="scss">
.menu-item {
  display: inline-block;
  height: 100%;
}
</style>
