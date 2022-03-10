<template>
<div>
  <span>Loading...</span>
</div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "er-social-callback",
    data() {
      return {
        callback: null
      }
    },
    methods: {
      ...mapActions(["login"]),
    },
    mounted() {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        let access_token = (window.location.href.split('#')[1]).split('&')[0].split('=')[1];
        this.login(access_token).then(() => this.$router.push("/"));
      } else {
        const self = this;
        setTimeout(function () {
          window.close()
        },5000);
        this.callback = this.auth.getAuth0().popup.callback()
      }
    }
  }
</script>

<style scoped>
</style>
