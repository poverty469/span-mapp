<template>
  <div class="the-tour-view">
    <the-tour-dashboard class="the-tour-dashboard"></the-tour-dashboard>
  </div>
</template>

<script>
import TheTourDashboard from "@/components/TheTourDashboard.vue";

export default {
  name: "TheTourView",
  props: {},
  data: function() {
    return {};
  },
  components: {
    TheTourDashboard
  }
};
</script>

<style lang="scss"></style>
