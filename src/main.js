import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VModal from "vue-js-modal";

import router from "./router.js";
import store from "./store/store";

import menuItems from "@/util/menuItems";

Vue.config.productionTip = false;

Vue.use(VModal);

Vue.use(VueRouter);
router.replace("/");
router.beforeEach((to, from, next) => {
  const menuItemIndex = menuItems.findIndex(menuItem => {
    return menuItem.path == to.name;
  });

  store.dispatch("setActiveMainMenuItemIndex", menuItemIndex);
  next();
});

new Vue({
  store,
  router,
  beforeCreate() {
    this.$store.commit("initializeState");
  },
  render: h => h(App)
}).$mount("#app");
