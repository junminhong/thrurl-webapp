import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Redirect from "../views/Redirect.vue"
import Login from "../views/Login.vue"
import DataCenter from "../views/DataCenter.vue"
import ClickInfo from "../views/ClickInfo.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:trackerID",
    name: "Redirect",
    component: Redirect
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/data-center",
    name: "DataCenter",
    component: DataCenter
  },
  {
    path: "/click-info",
    name: "ClickInfo",
    component: ClickInfo
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
