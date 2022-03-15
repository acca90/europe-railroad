<template>
<div>
  <span>Loading...</span>
</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "er-callback.vue",
  methods: {
    ...mapActions(["login"]),
  },
  mounted() {
    let access_token = (window.location.href.split('#')[1]).split('&')[0].split('=')[1];
    if( access_token != 'unauthorized' ) {
      this.login(access_token).then(() => this.$router.push("/"));
    } else {
      this.$router.push({
        name: "Login",
        params: { emailNotVerified: 'true'}
      });
    }
  }
}
</script>

<style scoped>

</style>