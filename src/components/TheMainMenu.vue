<template>
  <ul>
    <main-menu-item v-for="(item, index) of menuItems" :key="index" :menuItem="item" class="menu-item"></main-menu-item>
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
          path: "#map",
          description: "Displays a interactive visualization of the map."
        },
        {
          title: "stories",
          path: "#stories",
          description: "Displays multiple narratives from different locations."
        },
        {
          title: "tour",
          path: "#tour",
          description: "Displays a pop-up with a walkthrough to help the user gain a deeper understanding of the mission."
        },
        {
          title: "about",
          path: "#about",
          description: "Displays a narrative about what State-wide Poverty Action Network does."
        },
        {
          title: "faq",
          path: "#faq",
          description: "Common facts and questions are displayed."
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
  overflow: hidden;
  text-decoration: none;
}

.menu-item:hover {
  background-color: $dark-orange;
}
</style>
