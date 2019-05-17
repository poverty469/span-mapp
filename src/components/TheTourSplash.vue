<!-- ANY CHANGES MADE TO CONTENT HERE MUST BE REFLECTED IN THE INDEX.HTML COPY -->
<template>
  <div>
    <transition name="fade-long">
      <div v-show="appLoading" class="the-splash-page__background"></div>
    </transition>
    <div class="splash-page">
      <div class="splash-page__container">
        <div
          class="splash-page__card"
          :class="{ 'splash-page__card--loading': appLoading }"
        >
          <p class="splash-page__text">
            <b>
              Poverty is complex, and the reasons surrounding its existence are
              deeply historical and multifaceted. At Poverty Action, we believe
              that poverty can be solved through progressive and inclusive
              policy legislation. However, in order to pass anti-poverty reforms
              that are both equitable and sustainable, we must first understand
              the scope of poverty in our state.
            </b>
            <br />
            <br />This interactive map allows users to explore the social,
            economic, and historical elements behind poverty in Washington
            state.
            <br />
            <br />Our map shows the spread of poverty through a variety of
            factors, and includes stories of people affected by poverty in our
            state. In order to make the most of your time, we invite you to
            <b>take the tour of the state of poverty in Washington.</b>
          </p>
        </div>
        <transition name="fade-long">
          <a
            v-show="!appLoading"
            class="splash-page__start-tour-button splash-page__button splash-page__card"
            @click="handleStartTourButton"
            >Start the Tour</a
          >
        </transition>
      </div>

      <transition name="fade-long">
        <router-link
          v-show="!appLoading"
          to="map"
          class="splash-page__skip-tour-button splash-page__button splash-page__card"
          @click.native="handleSkipTourButton"
        >
          Not your first visit?
          <b>Skip the tour</b>
        </router-link>
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
.splash-page {
  pointer-events: none;
}

.the-splash-page__background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $light-orange;
}

.splash-page__card {
  border: 3px solid $dark-grey;
  box-shadow: $standard-box-shadow;
}

.splash-page__card--loading {
  box-shadow: none;
}

.splash-page__button {
  text-align: center;
  text-transform: uppercase;
  pointer-events: auto;
  cursor: pointer;
  user-select: none;
}

.splash-page__start-tour-button {
  display: block;
  margin-top: 2rem;
  padding: 15px 40px;
  background: $dark-orange;
  font-size: 3rem;
}

.splash-page__start-tour-button:hover {
  background: $light-orange;
}

.splash-page__start-tour-button:active {
  background: $dark-orange;
}

.splash-page__skip-tour-button {
  position: absolute;
  right: 0;
  bottom: $footer-height;
  margin: 15px 25px;
  padding: 7px 15px;
}

.splash-page__skip-tour-button:hover {
  background: $dark-orange;
}

.splash-page__skip-tour-button:active {
  background: $dark-orange--shadow;
}
</style>
