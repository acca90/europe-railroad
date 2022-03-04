<template>
  <div>
    <div>
      <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Community Center Contact Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <table class="table table-striped table-hover table-sm">
                <thead>
                  <tr>
                    <td style="width: 150px; text-align: left">Type</td>
                    <td style="width: 150px; text-align: left">Conctact</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="width: 150px; text-align: left">Community Center</td>
                    <td style="width: 150px; text-align: left">{{ contact.community_center_name }}</td>
                  </tr>
                  <tr v-if="contact.community_center_contact_name">
                    <td style="width: 150px; text-align: left">
                      Person in Charge
                    </td>
                    <td style="width: 150px; text-align: left">
                      {{ contact.community_center_contact_name }}
                    </td>
                  </tr>
                  <tr v-if="contact.community_center_phone_country_code || contact.community_center_phone_number">
                    <td style="width: 150px; text-align: left">Phone</td>
                    <td style="width: 150px; text-align: left">
                      {{ contact.community_center_phone_country_code }} {{ contact.community_center_phone_number }}
                    </td>
                  </tr>
                  <tr v-if="contact.community_center_email">
                    <td style="width: 150px; text-align: left">
                      Email
                    </td>
                    <td style="width: 150px; text-align: left">
                      {{ contact.community_center_email }}
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
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
          <th class="text-truncate" style="max-width: 300px">Current Location</th>
          <th class="text-truncate" style="max-width: 300px">Community Center</th>
          <th class="text-truncate" style="max-width: 150px">Orig. City</th>
          <th class="text-truncate" style="max-width: 150px">Final Destination</th>
          <th class="text-truncate" style="max-width: 150px">Optional Destination</th>
          <th class="text-truncate" style="max-width: 150px">Language</th>
          <th class="text-truncate" style="max-width: 150px">Can pay for transport</th>
          <th class="text-truncate" style="max-width: 150px">Car Seats</th>
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
          <td class="text-truncate" style="max-width: 300px">
            {{ row.current_address }}, {{ row.location_city }} ({{ row.location_country }})
          </td>
          <td class="text-truncate" style="max-width: 300px">
            <div v-if="!!row.community_center_address">
              <a v-if="isContactAvailable(row)"
                 class="thisIsALink"
                 data-bs-toggle="modal"
                 data-bs-target="#staticBackdrop"
                 v-on:mouseover="setContact(row)">
                <i class="fa fa-phone"></i>
                {{ row.community_center_address }}, {{ row.community_center_city }} ({{ row.community_center_country }})
              </a>
              <span v-else>
                {{ row.community_center_address }}, {{ row.community_center_city }} ({{ row.community_center_country }})
              </span>
            </div>
            <span v-else>
              -
            </span>
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
          <td colspan="14">No records found</td>
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
      contact: {},
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
    },
    setContact(row) {
      this.contact = row;
    },
    isContactAvailable(row) {
      return !!row.community_center_email ||
          !!row.community_center_phone_country_code ||
          !!row.community_center_phone_number
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
.thisIsALink:hover {
  color: #0a53be;
  text-decoration: underline;
  cursor: pointer;
}
</style>
