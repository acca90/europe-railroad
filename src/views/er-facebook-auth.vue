<template>
  <div>
  </div>
</template>

<script>

export default {
  name: "er-facebook-auth.vue",
  components: {
  },
  methods: {
    success_login(response) {
      this.auth.setStorage(response)
          .then(this.user_info_loaded, this.failop);
    },
    user_info_loaded(auth) {
      this.session.setStorage(auth)
      location.href = "/";
    },
    failop(err) {
      location.href = "/";
    },
  },
  created () {
    this.auth.handleAuthentication()
        .then(this.success_login, this.failop);
  }
}
</script>

<style scoped>

</style>
