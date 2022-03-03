<template>
  <table class="table table-striped table-hover table-sm">
    <thead>
      <tr>
        <th class="text-truncate" style="max-width: 150px">Help!</th>
        <th class="text-truncate" style="max-width: 150px">Scheduled</th>
        <th class="text-truncate" style="max-width: 150px">City</th>
        <th class="text-truncate" style="max-width: 150px">Country</th>
        <th class="text-truncate" style="max-width: 150px">Orig. City</th>
        <th class="text-truncate" style="max-width: 150px">Pref. Dest.</th>
        <th class="text-truncate" style="max-width: 150px">Opt. Dest.</th>
        <th class="text-truncate" style="max-width: 150px">Lang.</th>
        <th class="text-truncate" style="max-width: 150px">Payed Transport</th>
        <th class="text-truncate" style="max-width: 150px">Has Place</th>
        <th class="text-truncate" style="max-width: 150px">Need Job</th>
        <th class="text-truncate" style="max-width: 150px">Seats</th>
        <th class="text-truncate" style="max-width: 150px">Kids</th>
        <th class="text-truncate" style="max-width: 150px">Pets</th>
        <th class="text-truncate" style="max-width: 150px">Requested</th>
        <th class="text-truncate" style="max-width: 150px">Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in tableData" :key="row.id">
        <td class="text-truncate" style="max-width: 150px">
          {{ row.transpo_form_link }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.transport_scheduled }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.location_city }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.location_country }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.original_city }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.preferable_final_location }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.optional_final_location }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.language }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.pay_transportation }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.place_to_stay }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.help_to_find_job }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.how_many_cars_seats || '-' }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.how_many_kids || '-' }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ row.how_many_pets || '-' }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ new Date(row.inserted).toLocaleDateString() }}
        </td>
        <td class="text-truncate" style="max-width: 150px">
          {{ new Date(row.updated).toLocaleDateString() }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "er-table.vue",
  data() {
    return {
      tableDataRaw: [],
      canRefresh: true,
    };
  },
  computed: {
    tableData() {
      return this.tableDataRaw;
    },
    disableRefresh() {
      return !this.canRefresh;
    },
  },
  methods: {
    async refresh() {
      const response = await this.$axios.get(
        "https://sc-ukraine.ndmglobal.com/api/execute/all-refugees"
      );
      console.log(response.results);
      this.tableDataRaw = response.results;
      this.canRefresh = false;
      setTimeout(() => (this.canRefresh = true), 60 * 1000 * 5);
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style scoped></style>
