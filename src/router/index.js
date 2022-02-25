import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Redirect from "../views/Redirect.vue";
import Login from "../views/Login.vue";
import DataCenter from "../views/DataCenter.vue";
import ClickInfo from "../views/ClickInfo.vue";
import { useCookies } from "vue3-cookies";
const axios = require("axios");
const { cookies } = useCookies();
function checkAtomicToken(to, from, next) {
  var nickName = "";
  axios
    .get("http://127.0.0.1:9200/api/v1/member/profile", {
      headers: {
        Authorization: "Bearer " + cookies.get("atomic_token"),
      },
    })
    .then((result) => {
      if (result.data.result_code === 1015) {
        nickName = result.data.data.nick_name;
      }
    })
    .then(() => {
      if (nickName === "") {
        next({ name: "Login" });
      } else {
        next();
      }
    });
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:trackerID",
    name: "Redirect",
    component: Redirect,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/data-center",
    name: "DataCenter",
    component: DataCenter,
    beforeEnter: [checkAtomicToken],
  },
  {
    path: "/click-info",
    name: "ClickInfo",
    component: ClickInfo,
    beforeEnter: [checkAtomicToken],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
