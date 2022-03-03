<template>
  <er-navbar />
  <div class="container">
    <RouterView />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.flag {
  width: 30px;
  height: 30px;
  border-radius: 50px;
}
</style>
