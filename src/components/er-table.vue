<template>
  <table class="table">
    <thead>
      <tr>
        <th>Final destination</th>
        <th>Current location</th>
      </tr>
    </thead>
  </table>
</template>

<script>
export default {
  name: "er-table.vue",
  mounted() {
    this.$axios
      .get("https://sc-ukraine.ndmglobal.com/api/execute/all-refugees")
      .then((response) => console.log(response));
  },
};
</script>

<style scoped></style>
