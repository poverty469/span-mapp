<template>
  <div class="the-tour-dashboard">
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
import TheTourInfo from "@/components/TheTourInfo.vue";
import TheTourNav from "@/components/TheTourNav.vue";

export default {
  name: "TheTourDashboard",
  components: {
    MbMap,
    TheTourInfo,
    TheTourNav
  },
  props: {},
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
$tour-dashboard-padding-vertical: 30px;
$tour-dashboard-padding-horizontal: 22px;
$tour-dashboard-height: calc(100% - #{$tour-dashboard-padding-vertical});
$tour-dashboard-width: calc(100% - #{$tour-dashboard-padding-horizontal});

$tour-dashboard__header-height: 65px;
$tour-dashboard__body-height: calc(100% - #{$tour-dashboard__header-height});

.the-tour-dashboard {
  padding: $tour-dashboard-padding-vertical $tour-dashboard-padding-horizontal;
}

.tour__header,
.tour__body {
  position: relative;
  display: block;
  width: 100%;
  outline: 1px solid black;
}

.tour__header {
  height: $tour-dashboard__header-height;
}

.tour__body {
  height: $tour-dashboard__body-height;
  bottom: calc(0 + #{$tour-dashboard-padding-vertical});
}
</style>
