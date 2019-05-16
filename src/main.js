import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import router from "./router.js";
import store from "./store/store";

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  store,
  router,
  beforeCreate() {
    this.$store.commit("initializeState");
  },
  render: h => h(App)
}).$mount("#app");
