<template>
<div>
  <span>Loading...</span>
</div>
</template>

<script>
  export default {
    name: "er-social-callback",
    data() {
      return {
        callback: null
      }
    },
    mounted() {
      const self = this;
      setTimeout(function () {
        window.close()
      },5000);
      this.callback = this.auth.getAuth0().popup.callback()
    }
  }
</script>

<style scoped>
</style>
