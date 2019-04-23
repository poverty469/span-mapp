import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";

Vue.config.productionTip = false;

new Vue({
  store,
  beforeCreate() {
    this.$store.commit('initializeState');
  },
  render: h => h(App)
}).$mount("#app");
