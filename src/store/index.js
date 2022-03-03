import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      accessToken: "",
    };
  },
  getters: {
    accessToken() {
      const allCookies = document.cookie;
      const cookiMap = {};
      allCookies.split(";").forEach((cookie) => {
        const cookiePair = cookie.split("=");
        if (cookiePair.length) {
          const key = cookiePair[0] || "";
          const value = cookiePair[1] || "";
          cookiMap[key.trim()] = value.trim();
        }
      });
      return cookiMap.accessToken;
    },
  },
  mutations: {
    setAuthentication(state, value) {
      state.isAuthenticated = value;
    },
    setAccessToken(state, value) {
      document.cookie = `accessToken=${value};`;
      if (!value) {
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        document.cookie = `expires=${now.toUTCString()};`;
      }
      state.accessToken = value;
    },
  },
  actions: {
    async login({ commit }, accessToken) {
      commit("setAccessToken", accessToken);
      commit("setAuthentication", true);
    },
    async logout({ commit }) {
      commit("setAccessToken", "");
      commit("setAuthentication", false);
    },
  },
});

export default store;
