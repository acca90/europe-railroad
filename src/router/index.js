import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/er-home.vue";
import Login from "../views/er-login.vue";

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
    // inicio: techo de autenticação, mudar para localadequado
    store.dispatch('authenticate', true).then(result => console.log(result));
    // fim: techo de autenticação, mudar para localadequado
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
