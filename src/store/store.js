import Vue from "vue";
import Vuex from "vuex";

import story from "./story";
import layers from "./layers";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    story: story,
    layers: layers
  },
  state: {
    mapLoading: true,
    mapFocusPadding: {
      top: 50,
      right: 50 + 10, // + 50 padding + right shift accomodation (12px)
      bottom: 50,
      left: 200 // + <50 padding
    },
    activeMainMenuItemIndex: 2,
    tourInProgress: false,
    mapVisited: false
  },
  getters: {
    mapFocusPadding: state => {
      return state.mapFocusPadding;
    },
    appLoading: state => {
      return state.mapLoading;
    },
    dataLoaded: state => {
      return state.layers.geometries.length == 1;
    },
    activeMainMenuItemIndex: state => {
      return state.activeMainMenuItemIndex;
    },
    tourInProgress: state => {
      return state.tourInProgress;
    },
    mapVisited: state => {
      return state.mapVisited;
    }
  },
  mutations: {
    /**
     * Initialize the state with essential map data from local storage.
     * https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
     * TODO: Implement vuex-persistedstate if need more options
     * @param {*} state
     */
    initializeState(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
    setMapLoading(state, loading) {
      state.mapLoading = loading;
    },
    setActiveMainMenuItemIndex(state, index) {
      state.activeMainMenuItemIndex = index;
    },
    setTourInProgress(state, inProgress) {
      state.tourInProgress = inProgress;
    },
    setMapVisited(state, mapVisited) {
      state.mapVisited = mapVisited;
    }
  },
  actions: {
    mapLoaded(context) {
      context.commit("setMapLoading", false);
    },
    setActiveMainMenuItemIndex(context, index) {
      if (index > -1) {
        context.commit("setActiveMainMenuItemIndex", index);
      }

      if (index == 0) {
        // if map is visited
        context.commit("setMapVisited", true);
      }
    },
    startTour(context) {
      context.commit("setTourInProgress", true);
    }
  }
});
