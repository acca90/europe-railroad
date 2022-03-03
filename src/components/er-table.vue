<template>
  <div>
    <div class="row mt-10">
      <div class="col-md-2 col-sm-4 col-xs-12">
        <select class="form-select form-select mb-3" v-model="filterOption">
          <option value="">Select an option</option>
          <option value="CUR_LOCATION">Current location</option>
          <option value="FIN_DEST">Final Destionation</option>
          <option value="OPT_DEST">Optional Destionation</option>
        </select>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-12">
        <input type="text" class="form-control" :disabled="!filterOption" v-model="filterValue">

      </div>
    </div>
    <div class="row">
      <table class="table table-striped table-hover table-sm">
        <thead>
        <tr>
          <th class="text-truncate" style="max-width: 80px">I can Help!</th>
          <th class="text-truncate" style="max-width: 300px">Current Country / City</th>
          <th class="text-truncate" style="max-width: 150px">Orig. City</th>
          <th class="text-truncate" style="max-width: 150px">Final Destination</th>
          <th class="text-truncate" style="max-width: 150px">Optional Destination</th>
          <th class="text-truncate" style="max-width: 150px">Lang.</th>
          <th class="text-truncate" style="max-width: 150px">Payed Transport</th>
          <th class="text-truncate" style="max-width: 150px">Has Place</th>
          <th class="text-truncate" style="max-width: 150px">Need Job</th>
          <th class="text-truncate" style="max-width: 150px">Seats</th>
          <th class="text-truncate" style="max-width: 150px">Kids</th>
          <th class="text-truncate" style="max-width: 150px">Pets</th>
          <th class="text-truncate" style="max-width: 150px">Requested</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in tableData" :key="row.id">
          <td class="text-truncate" style="max-width: 150px">
            <a class="btn btn-xs btn-primary" :href="row.transpo_form_link" target="_blank">
              <i class="fa fa-cab"></i> Fill the form
            </a>
          </td>
          <td class="text-truncate" style="max-width: 150px">
            {{ row.location_country }} ({{ row.location_city }})
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
            <span v-if="row.pay_transportation">Yes</span>
            <span v-else>No</span>
          </td>
          <td class="text-truncate" style="max-width: 150px">
            {{ row.place_to_stay }}
          </td>
          <td class="text-truncate" style="max-width: 150px">
            <span v-if="row.help_to_find_job">Yes</span>
            <span v-else>No</span>
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
            {{ new Date(row.inserted).toISOString().split("T")[0] }}
          </td>
        </tr>
        <tr v-if="!tableData.length">
          <td colspan="13">No data</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "er-table.vue",
  data() {
    return {
      tableDataRaw: [],
      canRefresh: true,
      filterOption: '',
      filterValue: '',
    };
  },
  computed: {
    tableData() {
      return this.filterTable(this.tableDataRaw);
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
      this.tableDataRaw = response.results;
      this.canRefresh = false;
      setTimeout(() => (this.canRefresh = true), 60 * 1000 * 5);
    },
    filterTable(datatable) {
      return datatable.filter(row => {
        if (!this.filterOption) {
          return row;
        } else {
          if (this.filterOption == 'CUR_LOCATION' && (this.compare(row.location_country) || this.compare(row.location_city))) {
            return row;
          }
          if (this.filterOption == 'FIN_DEST' && this.compare(row.preferable_final_location)) {
            return row;
          }
          if (this.filterOption == 'OPT_DEST' && this.compare(row.optional_final_location)) {
            return row;
          }
        }
      })
    },
    compare(term) {
      if (!term) {
        return true;
      }
      return term.toLowerCase().includes(this.filterValue.toLowerCase());
    }
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style scoped>
.btn-xs {
  padding: 5px;
}
td {
  vertical-align: middle;
}
.mt-10 {
  margin-top: 70px;
}
</style>
