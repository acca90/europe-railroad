import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'fontawesome-4.7/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'auth0-js/dist/auth0.min'

import AuthService from "./services/AuthService";

const auth = new AuthService();

const app = createApp(App);

app.use(router);

app.use(store);

app.mixin({
  data() {
    return {
      auth,
    }
  }
});

app.mount('#app')
