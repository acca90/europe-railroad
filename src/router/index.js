import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/er-home.vue";
import Login from "../views/er-login.vue";
import erFacebookAuth from "../views/er-facebook-auth.vue";
import erFacebookCallback from "../views/er-facebook-callback.vue";

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
    if (localStorage.getItem("userToken") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      if (!store.state.isAuthenticated) {
        next({
          path: "/login",
          params: { nextUrl: to.fullPath },
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});


export default router;
