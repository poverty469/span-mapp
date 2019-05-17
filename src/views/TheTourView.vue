<template>
  <div class="the-tour-view">
    <transition name="fade-quick">
      <the-tour-splash
        v-show="!tourInProgress"
        class="the-tour-splash"
        @startTour="handleStartTour"
      ></the-tour-splash>
    </transition>
    <transition name="fade-quick">
      <modal
        name="the-tour-dashboard"
        class="the-tour-dashboard__modal"
        @before-open="beforeModalOpen"
        @before-close="beforeModalClose"
      >
        <the-tour-dashboard class="the-tour-dashboard"></the-tour-dashboard>
      </modal>
    </transition>
  </div>
</template>

<script>
import TheTourSplash from "@/components/TheTourSplash.vue";
import TheTourDashboard from "@/components/TheTourDashboard.vue";

export default {
  name: "TheTourView",
  props: {},
  data: function() {
    return {
      tourInProgress: false
    };
  },
  components: {
    TheTourSplash,
    TheTourDashboard
  },
  methods: {
    handleStartTour() {
      this.tourInProgress = true;
      this.$modal.show("the-tour-dashboard");
    },
    beforeModalOpen(e) {},
    beforeModalClose(e) {
      this.$router.push("/map");
      e.stop();
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

.the-tour-dashboard {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: z("tour-dashboard");
}

.the-tour-dashboard__modal {
  position: relative;
  height: 100%;
  width: 100%;
}

.the-tour-dashboard__modal > .v--modal-background-click {
  position: relative;
  height: 100%;
  width: 100%;
}

$modal-width: 96vw;
$modal-width-padding: calc((100vw - #{$modal-width}));

.the-tour-dashboard__modal > * > .v--modal-box {
  position: relative;
  height: calc(
    100vh - #{$header-height} - #{$footer-height} - #{$modal-width-padding}
  ) !important;
  width: $modal-width !important;
  left: calc(#{$modal-width-padding} / 2) !important;
  top: calc(#{$modal-width-padding} / 2) !important;
  bottom: calc(#{$modal-width-padding} / 2) !important;

  background: $light-orange;
}
</style>
