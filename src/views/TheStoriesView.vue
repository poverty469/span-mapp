<template>
  <div class="the-stories-view">
    <the-stories v-for="story of Stories"
      :key="story"
      :name="story.name"
      :image="story.image"
      :city="story.city"
      :bio="story.bio"
    >
    </the-stories>
  </div>
</template>

<script>
import TheStories from "@/components/TheStories.vue";
import Stories from "@/assets/data/stories.js";

export default {
  name: "TheStoriesView",
  props: {},
  data: function() {
    return {
      Stories: Stories
    };
  },
  components: {
    TheStories
  }
};
</script>

<style lang="scss">
  .the-stories-view {
    background: rgb(0, 0, 0);
    position: relative;
    margin-bottom: $footer-height; 
  }
</style>
