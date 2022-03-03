<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <div class="flag">
          <img alt="Help Ukraine" slot="flag" class="flag" src="@/assets/flag.png">
        </div>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page" href="#">
              <b>Home</b>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" aria-current="page" href="#">
              <b>Drivers</b>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" aria-current="page" href="#">
              <b>Refugees</b>
            </RouterLink>
          </li>
        </ul>



      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: "er-navbar.vue"
}

</script>

<style scoped>

</style>
