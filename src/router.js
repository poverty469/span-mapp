import VueRouter from "vue-router";

import TheAboutView from "@/views/TheAboutView";
import TheFaqView from "@/views/TheFaqView";
import TheMapView from "@/views/TheMapView";
import TheStoriesView from "@/views/TheStoriesView";
import TheTourView from "@/views/TheTourView";

export default new VueRouter({
//  mode: "history",
  routes: [
    { name: "home", path: "/", redirect: "/tour" },
    { name: "about", path: "/about", component: TheAboutView },
    { name: "faq", path: "/faq", component: TheFaqView },
    { name: "map", path: "/map", component: TheMapView },
    { name: "stories", path: "/stories", component: TheStoriesView },
    { name: "tour", path: "/tour", component: TheTourView }
  ]
});
