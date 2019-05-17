<!-- ANY CHANGES MADE TO CONTENT HERE MUST BE REFLECTED IN THE INDEX.HTML COPY -->
<template>
  <div>
    <transition name="fade-long">
      <div v-show="appLoading" class="the-splash-page__background"></div>
    </transition>
    <div class="splash-page-container--loaded">
      <div
        class="splash-page__text-container"
        :class="{ 'splash-page__text-container--not-loading': !appLoading }"
      >
        <p class="splash-page__text">
          <b>
            Poverty is complex, and the reasons surrounding its existence are
            deeply historical and multifaceted. At Poverty Action, we believe
            that poverty can be solved through progressive and inclusive policy
            legislation. However, in order to pass anti-poverty reforms that are
            both equitable and sustainable, we must first understand the scope
            of poverty in our state.
          </b>
          <br />
          <br />This interactive map allows users to explore the social,
          economic, and historical elements behind poverty in Washington state.
          <br />
          <br />Our map shows the spread of poverty through a variety of
          factors, and includes stories of people affected by poverty in our
          state. In order to make the most of your time, we invite you to
          <b>take the tour of the state of poverty in Washington.</b>
        </p>
      </div>
      <transition name="fade-long">
        <button
          v-show="!appLoaded"
          class="splash-page__start-tour-button splash-page__button"
          @click="handleStartTourButton"
        >
          Start Tour
        </button>
      </transition>
      <transition name="fade-long">
        <router-link
          v-show="!appLoading"
          to="map"
          class="splash-page__start-tour-button splash-page__button"
          @click.native="handleSkipTourButton"
          >Skip Tour</router-link
        >
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheTourSplash",
  props: {},
  data: function() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(["appLoading"])
  },
  methods: {
    handleStartTourButton() {
      this.$emit("startTour");
    },
    handleSkipTourButton() {}
  }
};
</script>

<style lang="scss" scoped>
/* Reference index.html for css */
.splash-page-container--loaded {
  position: fixed;
  width: $app-width;
  height: $app-height;
  top: 0;
  left: 0;
}

.the-splash-page__background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $light-orange;
}

.splash-page__text-container {
  border: 3px solid white;
}

.splash-page__text-container--not-loading {
  border: 3px solid $dark-grey;
}

.splash-page__button {
  pointer-events: auto;
}
</style>
