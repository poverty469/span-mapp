<template>
  <div>
    <the-tour-splash
      class="the-tour-splash"
      @startTour="handleStartTour"
    ></the-tour-splash>
    <div class="tour__header">
      <h1 class="tour__title"></h1>
      <div class="tour__close-button"></div>
    </div>
    <div class="tour__body">
      <mb-map mapId="tour__map"></mb-map>
      <div class="tour__sidebar">
        <the-tour-info></the-tour-info>
        <the-tour-nav></the-tour-nav>
      </div>
    </div>
  </div>
</template>

<script>
import MbMap from "@/components/MbMap.vue";
import TheTourSplash from "@/components/TheTourSplash.vue";
import TheTourInfo from "@/components/TheTourInfo.vue";
import TheTourNav from "@/components/TheTourNav.vue";

export default {
  name: "TheTourDashboard",
  components: {
    MbMap,
    TheTourSplash,
    TheTourInfo,
    TheTourNav
  },
  props: {},
  data: function() {
    return {};
  },
  methods: {
    handleStartTour() {
      console.log("start tour");
    }
  }
};
</script>

<style lang="scss">
.the-tour-splash {
  position: relative;
  width: $app-width;
  height: 100%;
}
</style>
