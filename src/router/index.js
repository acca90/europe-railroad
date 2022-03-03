import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/er-home.vue";
import Login from "../views/er-login.vue";
import erFacebookAuth from "../views/er-facebook-auth.vue";
import erFacebookCallback from "../views/er-facebook-callback.vue";
import erSupport from "../views/er-support.vue";

import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/facebook",
      name: "Facebook Auth",
      component: erFacebookAuth,
    },
    {
      path: "/facebook/callback",
      name: "Facebook Auth",
      component: erFacebookCallback,
    },
    {
      path: "/support",
      name: "Support",
      component: erSupport,
    },
    // {
    //   path: "/facebook/deauthorize",
    //   name: "Facebook Auth",
    //   component: erFacebookAuth,
    // },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const accessToken = store.getters.accessToken;
    if (!accessToken) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      if (!store.state.isAuthenticated) {
        store.dispatch("login", accessToken);
      }
      next();
    }
  } else {
    next();
  }
});

export default router;
