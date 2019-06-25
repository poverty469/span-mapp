<template>
  <div class="the-about-view">
    <the-about></the-about>
  </div>
</template>

<script>
import TheAbout from "@/components/TheAbout.vue";
export default {
  name: "TheAboutView",
  props: {},
  components: {
    TheAbout
  },
  data: function() {
    return {};
  }
};
</script>

<style lang="scss">
.the-about-view {
  background: rgb(0, 0, 0);
}
</style>
