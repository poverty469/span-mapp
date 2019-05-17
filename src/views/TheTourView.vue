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
      <the-tour-dashboard
        v-show="tourInProgress"
        class="the-tour-dashboard"
      ></the-tour-dashboard>
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
  width: $app-width;
  z-index: z("tour-dashboard");
}
</style>
