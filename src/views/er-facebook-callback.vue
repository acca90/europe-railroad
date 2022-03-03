<template>
<div>
</div>
</template>

<script>
  export default {
    name: "er-facebook-callback",
    data() {
      return {
        callback: null
      }
    },
    mounted() {
      this.callback = this.auth.getAuth0Facebook().popup.callback()
    }
  }
</script>

<style scoped>
</style>
