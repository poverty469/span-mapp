import VueRouter from "vue-router";

import TheAboutView from "@/views/TheAboutView";
import TheFaqView from "@/views/TheFaqView";
import TheMapView from "@/views/TheMapView";
import TheStoriesView from "@/views/TheStoriesView";
import TheTourView from "@/views/TheTourView";

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/", redirect: "/tour" },
    { path: "/about", component: TheAboutView },
    { path: "/faq", component: TheFaqView },
    { path: "/map", component: TheMapView },
    { path: "/stories", component: TheStoriesView },
    { path: "/tour", component: TheTourView }
  ]
});
