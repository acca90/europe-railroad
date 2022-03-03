import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
    };
  },
  mutations: {
    setAuthentication (state, value) {
      localStorage.setItem('userToken', value);
      state.isAuthenticated = value;
    },
  },
  actions: {
    async authenticate ({commit}, value) {
      commit('setAuthentication', value);
    },
  },
});

export default store;