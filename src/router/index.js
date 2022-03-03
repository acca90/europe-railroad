import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/er-home.vue";
import Login from "../views/er-login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
