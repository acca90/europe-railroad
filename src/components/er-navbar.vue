<template>
  <nav
    v-if="isAuthenticated"
    class="navbar navbar-expand-lg navbar-dark fixed-top bg-primary"
  >
    <a class="navbar-brand" href="#">
      <div class="flag">
        <img
          slot="flag"
          alt="Help Ukraine"
          class="flag"
          src="@/assets/flag.png"
        />
      </div>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li :class="active == 'home' ? 'active' : ''" class="nav-item">
          <RouterLink to="/" class="nav-link" aria-current="page" href="#">
            <i class="fa fa-home"></i>
            Home
          </RouterLink>
        </li>
<!--        <li class="nav-item">-->
<!--          <RouterLink-->
<!--            to="/profile"-->
<!--            class="nav-link"-->
<!--            aria-current="page"-->
<!--            href="#"-->
<!--          >-->
<!--            <i class="fa fa-user"></i>-->
<!--            Profile-->
<!--          </RouterLink>-->
<!--        </li>-->
        <li class="nav-item">
          <button
            class="btn btn-xs btn-ukraine"
            aria-current="page"
            v-on:click="iAmRefugee()"
          >
            <b>I'm refugee / Я біженець</b>
          </button>
        </li>
        <li :class="active == 'support' ? 'active' : ''" class="nav-item">
          <RouterLink
            to="/support"
            class="nav-link"
            aria-current="page"
            href="#"
          >
            <i class="fa fa-warning"></i>
            Support
          </RouterLink>
        </li>
      </ul>
      <form class="text-end">
        <button class="btn btn-ukraine" v-on:click.prevent="logoutApp">
          <i class="fa fa-sign-out"></i>
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";
import { mapActions } from "vuex";

export default {
  name: "er-navbar.vue",
  props: {
    active: {
      type: String,
      default: "home",
    },
  },
  components: {
    RouterLink,
  },
  methods: {
    ...mapActions(["logout"]),
    iAmRefugee() {
      window.open(
        "https://forms.docq.app/?domain=ukraine.docq.app&form=a92a63d6-e639-4162-b3ee-dcbb1a6e286b",
        "_blank"
      );
    },
    logoutApp() {
      this.logout().then(() => this.$router.push("/login"));
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
};
</script>

<style scoped>
.router-link-active {
  font-weight: bold;
  color: white;
}
</style>
