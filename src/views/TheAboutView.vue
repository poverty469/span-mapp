<template>
  <div class="the-about-view">
    <div>
      <the-about></the-about>
    </div>
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
  background: rgb(255, 255, 255);
  margin-bottom: 1px;
  margin-top: 1px;
}
</style>
