<template>
  <div id="app">
    <er-navbar v-if="isLogged" />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script>

import { RouterView } from 'vue-router'
import erNavbar from "@/components/er-navbar.vue";

export default {
  name: 'App',
  components: {
    erNavbar,
    RouterView
  },
  data() {
    return {
      isLogged: false,
    }
  }
}

</script>

<style>

</style>
