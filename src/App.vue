<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <er-navbar />
    </div>
    <div class="row justify-content-md-center">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import erNavbar from "@/components/er-navbar.vue";

export default {
  name: "App",
  components: {
    erNavbar,
    RouterView,
  },
};
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
.btn-danger {
  border-color: #ebc815 !important;
  background-color: #fce205 !important;
  color: black !important;
}
</style>
