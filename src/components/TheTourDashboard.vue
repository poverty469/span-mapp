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
$tour-dashboard__header-height: 65px;
$tour-dashboard__body-height: calc(100% - #{$tour-dashboard__header-height});

.the-tour-dashboard {
  padding: 20px 0px 35px 0px;
}

.tour__header,
.tour__body {
  position: relative;
  display: block;
  width: 100%;
}

.tour__header {
  height: $tour-dashboard__header-height;
}

.tour__body {
  display: inline-flex;
  height: $tour-dashboard__body-height;
}

.tour__map,
.tour__sidebar {
  position: relative;
  display: inline-block;
  height: 100%;
}

$tour__sidebar-width: 30%;
$tour__map-margin-left: 22px;

.tour__body > .map-container {
  width: calc(100% - #{$tour__sidebar-width} - #{$tour__map-margin-left});
  margin-left: $tour__map-margin-left;

  border-radius: 8px;
  border: $thick-border solid $dark-orange--border;

  overflow: hidden;
}

.tour__sidebar {
  width: $tour__sidebar-width;
}
</style>
